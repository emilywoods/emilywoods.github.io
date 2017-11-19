---
layout: other
title: Emerald&#58 A Ruby Language With Lisp Syntax
category: compiler design
---

As a developer without a computer science background, I have some fundamental knowledge gaps to fill. With this in mind, the decision process behind writing my own compiler was fairly straightforward. It went something like this:

   `I write Java at work.
   Java is a compiled language.
   Do I know what that means?
   Maybe (but probably not really).`


The goal of this project was to gain an understanding of the compilation process, and a broader perspective on language design and implementation.

Here, we compile a Lisp-like language (Emerald) to Ruby, using a compiler written in Ruby. Two high level languages were used, because it enabled me to concentrate on the learning process of understanding how a compiler works. It also gave me the opportunity to play around with language design in creating my own Lisp-like Ruby, called Emerald.

---

#### Zoom out: What is a compiler?
In a nutshell, a compiler is a program that converts code written in one programming language to another. Usually, this involves converting a higher level language (e.g. Java) to a lower level form (e.g. Java bytecode). However compilers can also convert one high level language to another high level language (such as this one).

---

#### Compiler design
**Compiling a Lisp**

Lisps can look intimidating on first glance, but a Lisp was chosen because they typically possess a very simple, uniform syntax. Lisps usually have limited data structures, consisting two basic data types: atoms and lists.
{% highlight common_lisp %}
(defun add
    (x y)
    (+ x y))
{% endhighlight %}

Lists are enclosed within parentheses and are actually a form of binary tree data structure. An atom is every other data type e.g symbols, numbers. The tree structure of the example above will be seen later.  In Emerald, the atom data structure does not include strings and numbers.

**Compiling to Ruby**

There was no particular reason for selecting Ruby as both the target language and the language of implementation. Any language could have been chosen for either of these. Ruby seemed like a sensible choice because it's a language that I was comfortable with, which allowed me to maintain focus on understanding the compilation process. The next compiler I write will probably be written in, or compile to, something different!

---

#### Compilation Process
The compilation process can be broken down into five steps:

    1. Read source code from a file
    2. Carry out lexical analysis and parsing
    3. Convert the abstract syntax tree (AST) into Ruby code
    4. Optimise
    5. Write to a file and evaluate

<br><br>
{% include image.html url="/assets/images/compiler_process.png" description="Compilation Overview" %}
<br><br>

1\. Read source code from a file

  For this program, an input file is specified in the command line. Its contents are read as a string. This is an example input Emerald function:
  {% highlight common_lisp %}
  (defun add
      (x y)
      (+ x y)){% endhighlight %}

  <br><br>
2\. Lexical analysis and parsing

  The tree structure of the input function specified above can be viewed as:

  {% include image.html url="/assets/images/lisp_input_binary_tree.png" description="Tree Structure of Input" %}


  Or, in other words:
  {% highlight common_lisp %}
  list
    atom: defun
    atom: add
    list
      atom: x
      atom: y
    list
      atom: +
      atom: x
      atom: y {% endhighlight %}


  To convert the input Emerald content into an AST of Ruby Objects there are two key steps: dividing the text into nodes (lexical analysis) and categorising the nodes (parsing).

  In order to achieve this, the input code is read as a string. The first node or token encountered is categorised as a string, number, or atom, depending on the first character of the node. If the character is a bracket e.g. `(`, the bracket is exchanged for a symbol and handled at a later stage. This categorisation takes place as follows:

  {% highlight ruby %}
  def parse_node(source)
    first_char = source.slice(0)
    case first_char
    when " "
      parse_whitespace(source)
    when /\n/
      parse_newline(source)
    when /[a-zA-Z*\/<>%=]/
      parse_atom(source)
    when /[\d]/
      parse_number(source)
    when /"/
      parse_string(source)
    when /[(]/, /[)]/
      replace_parens_with_symbol(source, first_char)
    end
  end {% endhighlight %}

  The parsed node is then added to an empty list, and the rest of the source string is returned, minus the first node. The next node in the string is parsed in an identical fashion. When whitespace or a newline is encountered, then the source text is simply returned with the whitespace/newline removed. This process continues, until each node in the input has been parsed. Finally, a flat list of Ruby objects is returned:

  {% highlight ruby %}
  [:left_bracket, Emerald::Atom.new(‘defun’), Emerald::Atom.new(‘add), :left_bracket, Emerald::Atom.new(‘x’),
   Emerald::Atom.new(‘y’), :right_bracket, :left_bracket, Emerald::Atom.new(‘+’), Emerald::Atom.new(‘x’),
    Emerald::Atom.new(‘y’), :right_bracket, :right_bracket, :right_bracket]{% endhighlight %}


  In order to then create the nested list structure, a recursive depth-first search algorithm is used on the array of nodes. This begins with an empty list, and iterates through each element. Previously, all of the left and right brackets were substituted with `:left_bracket` and `:right_bracket` symbols. When `:left_bracket` is encountered (signaling the start of a new list), the method is recursively called, with the index incremented by one. The result of this is then pushed onto the list. When `:right_bracket` is encountered (signaling the end of a list), we return the incremented index, and a List object of all the elements that have been pushed onto the list. When any other character is encountered (list contents), the character is pushed onto the list, and the index is incremented.

    {% highlight ruby %}
      def parse_nested_list(array_of_nodes)
        _, elements = get_nested_struct_recursive(0, array_of_nodes)
        elements
      end

      def get_nested_struct_recursive(current_index, array_of_nodes)
        elements_at_my_level = []
        index = current_index

        until index == array_of_nodes.size
          node = array_of_nodes[index]

          case node
          when :left_bracket
            index, element = get_nested_struct_recursive(index + 1, array_of_nodes)
            elements_at_my_level.push(element)
          when :right_bracket
            return index + 1, List.new(*elements_at_my_level)
          else
            elements_at_my_level.push(node)
            index += 1
          end
        end
        [index, elements_at_my_level]
      end
    {% endhighlight %}

  This subsequently creates the AST of Ruby objects:

    {% highlight ruby %}
      Emerald::List.new(
        Emerald::Atom.new(‘defun’),
        Emerald::Atom.new(‘add),
        Emerald::List.new(
          Emerald::Atom.new(‘x’),
          Emerald::Atom.new(‘y’) ),
        Emerald::List.new(
          Emerald::Atom.new(‘+’),
          Emerald::Atom.new(‘x’),
          Emerald::Atom.new(‘y’) ) ) {% endhighlight %} <br><br>
3\. Convert the abstract syntax tree (AST) into Ruby code

   Generating Ruby code from the AST is carried out based on semantic analysis and Ruby syntax. Here, the AST is taken as the input source and is comprised of lists of strings, numbers, or atoms. Using this to generate Ruby code  is primarily influenced by the list structures and the contents of each atom:
  {% highlight ruby %}
    def type_of_atom(node)
      atom_types = {
        /^[-+*\/<>=]+$/ => "numerical_operation",
        /(?:empty\?)|(?:nil\?)/ => "logical_operation",
        /(?:defun)/ => "function",
        /(?:let)|(?:def)/ => "variable_assignment",
        /[\w]/ => "variable_name"
      }
      atom_types.map { |key, val| val if key.match(node) }.compact
    end {% endhighlight %}

  Identifying the meaning of each atom (lexical analysis), allows the construction of Ruby code from the source AST, based on known Ruby syntax.
  <br><br>
4\. Optimise

  Optimisation steps in the compilation process can be implemented for the purpose of enhancing performance, such as to use less memory or to run the program faster. Optimisation has yet to be carried out for this project.
  <br><br>
5\. Write to a file and evaluate

  When running the application, the input lisp:
  {% highlight ruby %}
  (defun add
      (x y)
      (+ x y)){% endhighlight %}
  is compiled to:
  {% highlight ruby %}
  def add (x, y)
    x + y
  end{% endhighlight %}
  which is written to a file and evaluated. The result is then output to the command line.

  Parsing the input and generating Ruby code are the core components of the compiler process. Reading the input and writing the output, are used to facilitate compilation and to produce a meaningful output to the process. Evaluating the output was not a necessary inclusion for the compiler, but was nice to have!

---

#### Limitations and Areas for Improvement

  This compiler has numerous limitations, and plenty of potential functionality that has yet to be developed! After a certain amount of time however, I felt that I had learned what I had initially set out to. As rewarding as it is to compile new and more complicated programs, the learnings started to feel like they were plateauing for this project. There remain several aspects of its functionality that I would like to develop and improve in future however. These primarily are:


  <li>It currently only compiles a handful of programs: numeric operations, variable assignments, logical operations and functions.</li>
  <li>It can only compile and evaluate a single individual script at a time</li>
  <li>It doesn't correctly prioritise nested lists</li>
  <li>It hasn't undergone any form of optimisation</li>

---


#### Learnings
  In addition to gaining an understanding of how compilers work, some other key learnings from this project are:

  <li> TDD is great!</li>

  Particularly when you're exploring different approaches to carrying out a particular task, and need a safety net. TDD enabled me to build up the parser incrementally, and when I decided that I wanted to refactor my implementation, the tests enabled me to do so freely.
  <li> Compilers are not all that magical.  </li>
  <li> Making a complete compiler is a difficult, time-consuming task, but making a basic, functioning one is not.</li>
  It can be as comprehensive as you want, and the amount of time you put into it really depends on its eventual purpose.

---

#### Acknowledgements
I'm very lucky. I've had the opportunity to work with two amazing developers in the past few months.

[Louis](https://lpil.uk/) is essentially the Pied Piper of the coding world. I learn something new every time I speak to him. This wonderful person reviewed PRs, gave feedback, and shaped my vision, particularly when getting started with this project.

[Andrei](https://github.com/andreishappy) is a compulsive-learner. His enthusiasm is quite infectious. He likes algorithms (a lot) and was rather excited when I asked him to review my approach to parsing s-expressions. He was very insightful when it came to producing a more preferable recursive one (which is used above).   

---

Source code for this project and Emerald language specifications can be found [here](https://github.com/emilywoods/emerald). PRs and feedback are always welcome ;)
