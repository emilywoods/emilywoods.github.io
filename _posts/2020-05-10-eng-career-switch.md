---

layout: post
title: An Engineering Career Switch
category: engineering
---

This blog post has been sitting in my drafts for months, and it seems to be blocking me
from publishing anything else. I'm not totally pleased with it, but am going to push the
perfectionist in me aside in order to publish it and move on...

This is a post about my experiences as an engineering industry career switcher. I have a
bachelor's degree in process engineering and spent 1.5 years working in a production
plant. I quickly learned that is wasn't for me, and after some twists and turns
became a software developer.

This post is a summary of some possible insights into an engineering career
switch and is based on a talk which I gave at [Python Pizza Conference](https://berlin.python.pizza/) in Berlin
almost a year ago. It aims to compare and constrast the two industries, as well as
highlighting what each industry could learn from the other.

Note: I worked as a process engineer for 1.5 years, and left that industry
5 years ago.

<br><br>

Similarities
------------
<br>

### Testing and Monitoring

Both industries use forms of testing to ensure that the things we build work
correctly to fulfil a set of requirements. For example, a piece of software or process equipment needs
to work as expected, perhaps needs to meet performance
expectations, and must be able to operate reliably under certain conditions.
So, we need forms of testing and monitoring both before something is approved
for use and subsequently when in use.

In software there are [a whole spectrum of tests](https://en.wikipedia.org/wiki/Software_testing) to 
help ensure production-readiness. This might include unit, integration and end-to-end, manual, and performance
tests, to name a few. While process engineering doesn't have unit and
integration testing, as such, there will often be comparable pre-production
checks such as visual inspections or [hydrostatic tests](https://en.wikipedia.org/wiki/Hydrostatic_test) before a new piece of
equipment can be used. For example, before accepting a new [pressure vessel](https://en.wikipedia.org/wiki/Pressure_vessel) for
use, I carried out visual inspections of its weld finish.

Then, once a piece of software or process equipment is ready for production
use, we monitor and alert. In both scenarios, we try to alert on things which will affect users. That's
because interruptions are costly and cause waste (of
time or resources). In software you might monitor a service's availability
or number of requests, whereas in process engineering you could monitor
the visual appearance of a product in a production line or for the presence
of unsafe materials in a product e.g. through metal detection. If the
parameters of these checks are exceeded, then an action is taken. The action
can be automated, e.g. autoscaling a software resource or removing an item
from the production line using a robot arm, or it could be manual e.g.
somebody is paged with the intention to investigate and resolve.

The primary difference is that in process engineering industries, the tests
and verification are often mandatory. They're required to be completed in
order to sign-off that a project or product is safe for use.
There are regulations and regular audits to ensure that you're meeting these
standards, with strict repurcussions. This *usually* isn't the case is
software (although this of course depends on the end-use of the software e.g.
software for airplanes, hospitals, etc. are a bit different).

### Methodologies

In both industries, we both use methodologies to guide our work. Process
engineering uses [Lean Six Sigma (LSS)](https://en.wikipedia.org/wiki/Lean_Six_Sigma),
in software we often use [Agile](https://en.wikipedia.org/wiki/Agile_software_development) to organise our teams and work processes.

*Aside: I haven't worked as a process engineer in 5 years, so this knowledge
may be a bit outdated*

Lean Six Sigma is a process improvement methodology used in manufacturing to
eliminate waste, defects, and variability. There are [8 different forms of waste](https://www.isixsigma.com/dictionary/8-wastes-of-lean/)
that are managed. These forms of waste extend beyond physical waste and include
wasteful practices such as maintaining inventory, over-processing, and over-production. There are also suggested approaches
for managing each form of waste, e.g. to reduce over-production, you can adopt
a [Kanban](https://en.wikipedia.org/wiki/Kanban) system to control the amount of work in progress.
If you work in software, this approach might also sound familiar too.

When we use Agile methodologies in software, we aim for efficiency and [to deliver value early](https://agilemanifesto.org/principles.html).

<br><br>

Differences
-----------
<br>

### Feedback loops

In software we can have relatively short feedback loops. A simplified workflow might be: 

 1. Write (and test) your code  
 2. Open a pr and make sure [continuous integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) checks pass before merging  
 3. Deploy to pre-prod environments and carry out further testing   
 4. Deploy to production 

With supportive tooling and a robust workflow, it’s possible to make changes and see them live in almost no time.

By comparision, in process engineering, from the time your project is kicked off to your first production run,
months may have passed. Equipment may need to be designed and physically built, people need
to be trained to operate the equipment, and all of the process equipment needs to be integrated. These steps take time,
and often can only happen sequentially and in more of a [waterfall](https://en.wikipedia.org/wiki/Waterfall_model) style of management. 

### Attitude towards variability

Both industries deal with variability, but in different ways.

In software, we aim to embrace and adapt to variability. Things change quickly in software - the languages, frameworks, and tools we
use are continuously evolving, and we encourage and expect that. Things rarely remain stagnant for long.
We work with complex systems which we can never fully control or even completely understand.

In process engineering, the aim is to eliminate variability. Often, the foundations on which design decisions are made
are well-established: fluid dynamics, gravity, etc. Things that you can’t control, but you can anticipate and factor into your plans.
You want to eliminate variability in your processes because it usually results in unwanted situations such as product contamination, or unstable
process behaviour.

### What it means to be an engineer

To become a process engineer, you typically need to study a relevant degree for 3-5 years. After that, you’re an engineer, and you don’t really
question that title.

Software is a bit more blurry. We’re engineers, but we’re also [craftspeople](https://en.wikipedia.org/wiki/Software_craftsmanship). And to me, it feels like we're both of these
but also something more, and something which I can never fully define. (Maybe [Jessica Kerr's](https://twitter.com/jessitron) description
of [software development as the practise of symmathesy](https://medium.com/the-composition/the-origins-of-opera-and-the-future-of-programming-bcdaf8fbe960)
is the definition I'm lacking).

To form parallels between working as a Process Engineer and a Software Engineer, I often think that my role as a Process Engineer was much
more similar to that of a Product Owner or Project Manager than to that of a Software Developer. It was much more communication-focused. My
responsibility as a process engineer was to guide people and components towards realising the same goal. I rarely carried out the implementation
myself, because I didn't possess the skillset or expertise to perform things such as electrical work or welding. Instead, other experts
would do that, and I would verify that this piece of work met the needs of the use-case.

Because of that, I often find it bewildering when non-coders on a software engineering team can be referred to as "non-technical", since
we all fulfil different, but nevertheless valuable roles in shaping and engineering a product together.
<br><br>

What are software engineers good at?
------------------------------------
<br>

### Version control

Version control seems so obvious in hindsight, but it never previously occurred to me that there could be tools to easily manage this.
Having access to tools which can be used to easily make and track changes to a file, and to use this to collaborate with others fluidly, is amazing.
We should share this, since so many other industries could be using it!

When I was working as a process engineer my 'version control' process (even for shared documents) involved making a
copy of a file, naming the first file *my-document-v1.txt* and the other *my-document-v2.txt* and make changes in the
*v2* document. Unsurprisingly, this doesn't scale well. 

### Work processes

In general our work processes are much better!

We have regular [retros](https://www.scrum.org/resources/what-is-a-sprint-retrospective), and work in fixed time intervals
(such as [sprints](https://en.wikipedia.org/wiki/Scrum_(software_development)#Sprint)). This allows ourselves time for reflection
and to be able to continuously see progress. We build tools to make our lives easier.

In comparison, as a process engineer I used to try to use [gantt charts](https://en.wikipedia.org/wiki/Gantt_chart) to predict and measure project progress. If you've ever struggled with estimating the amount of work
which can be  done in a two-week sprint, you can imagine how well this translates to a six month period.  

And to request project funding, a templated document would be filled out, printed, and taken to multiple managers for
review. They would read it and add comments (either directly on the document or on post-its). If they approved the proposal they would sign it (yay!),
and if not, you would update the document to address their comments, print it again and restart the process until you had all
the signatures you needed. How much simpler life would have been if we had known about pull requests!

### Learning and Community

When I first became acquainted with this industry, I was excited. There was so much to learn, and so many ways and places to learn from.
To be honest it was a little overwhelming. You have access to:
   
- meetups  
- conferences  
- online resources and repositories 
- podcasts 
- etc.  

And it’s easy to experiment for yourself - if you want to learn a new language you can just build a tool in it.
People are enthusiastic (and opinionated), and it can be infectious.

As process engineer, I never felt that. Communities may exist in the form of organisations and institutions which you
subscribe to, but they felt less present and less relevant. You can potentially learn from others by visiting other production
plants, but even when this is possible, there’s a lot of information which is closely guarded from external people.
<br><br>

What are process engineers good at?
-----------------------------------
<br>

### Building to last

In process engineering, systems are usually designed to last for years, or even decades.

Software is a bit more disposable, and in fact, we often want to dispose of it! I mean, it’s pretty
satisfying to open a pull request wherein more code is being deleted than is being added. We would often
rather start from scratch than try to work with someone else’s solution, because it’s easier (and more fun)
to understand a problem by working through it yourself than to try and work with someone else's approach, especially
if it's one which has grown arms and legs over time. And when we hear the phrase “legacy code”, we think of something
which is outdated, cumbersome to work with, and generally something we'd prefer to avoid. Even though, to
be honest, it’s probably not that old and often functions well enough to keep users happy.

In process engineering, you try to solve problems sustainably and with minimal waste, including wasted effort.                                           

### Taking responsibility

Ethics, sustainability, safety and environmental protection were fundamental components of my process engineering degree.
This is because as a industry, it can be dangerous to work in or around.  Your actions have the potential to put people’s lives
or the environment at risk, and this was made abundantly clear to me throughout my degree.

Software can have positive **and negative impacts**. But we don’t often think of the negatives,
because it’s usually more indirect or less visible, so we may not hold ourselves responsible or accountable.

It’s common for process engineering degrees to have compulsory classes on ethics in engineering, sustainable design, and the environment.
I personally don’t know anyone with a computer science or software engineering degree who was taught anything like this.
But I think they should be, considering that software and the work we collectively do impacts so much of our day-to-day lives.
<br><br>

Wrap-up
-------

I am happy I converted to software engineering, since on a personal level I find it more fun and fulfilling,
and (at least in the environments I've worked in) people generally seem much more excited about what they're
working on.

The only thing that I miss about process engineering is working in the physical
environment of a production plant, since everything in the plant seemed fascinating to me.
