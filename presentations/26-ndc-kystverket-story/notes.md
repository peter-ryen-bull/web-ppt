# Speaker notes: 100 million rows a day (NDC 2026, 60 min)

Everything before the first `## slide-id` heading is ignored. This area is a
draft.

### The red thread

One sentence everything hangs on:

> One AIS signal off Stad at 03:14 becomes, through the platform, the climate
> accounts of a municipality. And that's why we build a data platform.

The ship off Stad is our character. We meet it in the opening, follow it
through MarTraf and MarU, and come back to it at the very end. Every time you
can say "our ship," say it. The audience should recognize it.

### Dramaturgy and schedule

| Act                                 | Start | Content                                                                           |
| ----------------------------------- | ----- | --------------------------------------------------------------------------------- |
| 1 The opening                       | 00:00 | scene, signal, NAIS, 100 million, title slide, Peter                              |
| 2 Who's listening                   | 05:00 | Kystverket, the vision, the mission, the listening posts, AIS                     |
| 3 Why data platform                 | 12:00 | why everyone builds them, Hoffman, everyday life                                  |
| 3b The story of the platform        |       | fifty years, same problem                                                         |
| 3c How a data platform works        |       | architecture, products                                                            |
| 4 What you get out of it            | 27:00 | four effects with examples from the coastline                                     |
| 5 The project                       | 32:00 | day one, the toolbox, terraform                                                   |
| 6 The products                      |       | HAIS, follow one ship, MarTraf, MarU, how it was done earlier, the propeller law |
| 6b Technical implementation details |       | ingest, the stream, the history, H3, batch vs streaming                         |
| 7 The road ahead                    | 53:00 | domains, contracts, back to Stad, thanks                                        |

If you're behind after the products, cut the batch/streaming sidenote (two
slides, about three minutes). If you're behind during technical, cut
hex-hvorfor, hex-join and h3-ship. If you're behind during the products, cut
maru-hull.

### Rules for the language in these notes

Spoken. You and we. Short sentences here and there. Ask the audience. No em
dashes. Say it the way you'd say it to a colleague over a coffee.

### Numbers from research

- ~90 base stations, 4 operational AIS satellites (AISSat-4 launched March 2026, about NOK 15 million)
- 100 million messages a day, data stored back to 2005
- Open data under NLOD, real time via the BarentsWatch API and a raw TCP stream
- AIS interval: ships moving at 0 to 14 knots transmit every 10 seconds
- 100 million rows/day ≈ 1,157 per second. Read one per second, and one day's data takes 3.2 years.
- The propeller law: (2)³ = 8. Double the speed, eight times the power.

## scene – The time is 03:14

[00:00]

[[CLICK]] The time is 03:14.

[[CLICK]] We're on the sea off Stad. It's February. There's a gale from the
northwest, and it's completely dark.

[[CLICK]] Out there, a lage cargo ship is heading north. Nine knots. Twenty people on board, most of them asleep. One is standing on the bridge with a cup of
coffee, watching the radar.

And while he stands there, something happens that he doesn't think
about. Something the ship does entirely on its own.

## signal – Every ten seconds, the ship says

Every ten seconds, the ship sends a little message out into the dark.

[[CLICK]] And the message is actually pretty simple. It says: who I am. Where I
am. How fast I'm going. Where I'm headed. And what I'm doing right now.
Five things. That's all.

Nobody on board thinks about it. Nobody presses a button. The message
just goes. Over VHF, out into the gale, in every direction.

And so the question is: who is listening?

## nais – Someone's listening: NAIS

This is the Norwegian coast.
Every single dot on this map is a ship sending a message I just showed you.

Every dot is a crew.
Some of them are ferries with people on their way to work. Some are fishing
boats. Some are cruise ships with over three thousand passengers.

[[[[CLICK]]]]
And this map is open. nais.kystverket.no. You can open it on your
phone right now and watch ship go by.

There are quite a lot of ships. And they are sending quite a lot of messsages.
And this is what i really want to talk about. Look at the number behind
this map.

## hundre-millioner – 100,000,000 every day

One hundred million.

[[CLICK]] That's how many of these messages go through our system. Every single
day.

Let that sink in for a moment. One hundred million is a number we say
quickly, but it's hard to feel.

## hundre-millioner-fyll – The messages fill the screen

Each boat is one hundred messages. Every second of every day 1100 messages appear.

That's the stream this talk is about. And the question is actually pretty
simple: how do you turn one hundred million little messages into something
someone can use?

And what can we this data for?

This is every second of every day and it just keeps comign.
And over the years, this becomes quite a large amount of data.

And this becomes not only a logic problem, but a scaling problem as well

## forside – Title slide

This is the story of the data platform behind the coastline

It's a story about why an agency that runs lighthouses and beacons and pilot
services suddenly found itself with one of the biggest data streams in the
Norwegian public sector, and what we did with it.

## om-peter – Peter Bull

My name is Peter. 

[[Click]]. I'm a data platform developer at Miles.

[[Click]]. I design data architecture for large organizations.

[[Click]]. I build the data platform for Kystverket, the Norwegian Coastal
Administration. Before that I've built platforms for both private companies
and public agencies, and what I've learned is that the problems are
surprisingly similar. It's only the data that changes names.

[[Click]]. Previously I was tech lead for the data platform for the Norwegian
Police.

Click. And I work in Azure, Databricks and Terraform.

And I ski. A lot.

[[Click]] This is a normal Saturday. Looking down a steep line, with the coast
underneath.

[[Click]] This is Hanna. She puts up with all of this.

## kystverket – Who's listening? Kystverket

[05:00] So. Who's listening to our ship?

We are the Norwegian Coastal Administration. Kystverket. 
The transport agency for the coastline. We make sure the coast, the ships and everything nautical is running smoothly. 

And before we get into the technology, we need to understand why we do
what we do.

## visjon – The world's safest and cleanest coast

This is the Coastal Administration's vision. 
The world's safest and cleanest coast.

[[CLICK]] 
We want a coast without pollution, we want a coast where no people drown. 

Because when we're talking about processing speed, data platforms and data contracts -> this is the why. 


Everything else is the how.

## oppdrag – About us

The coastal administration is split into four areas. 

[[CLICK]] Pilotage. A local expert who boards the big ships and helps them in.
In Norwegian it's called a "Los". The piloage service, they wake up in the middle of the night, travel out to ships, come with local knowledge of the sea maps, and guide boats in.

[[CLICK]] Environment. When a ship runs aground and oil starts leaking, it's the NCA
that leads the operation. Depots with oil booms along the whole coast.

[[CLICK]] Navigation technology. That's the lighthouses and beacons and sea marks.
And the vessel traffic centers, watching the traffic around the clock,
just like air traffic controllers, only for ships. And AIS-messages.

[[CLICK]] Transport, ports and fairways. The physical coastline. The channels, the
harbors, the National Transport Plan for the sea.

[[CLICK]] And here's what I want you to see: all four start with exactly the
same question.

[[CLICK]] Where are the ships right now? If you want to prevent a
collision, you need to know where the ships are.
If you're leading an oil spill response, you need to know which ships are nearby and can help.
Navigation and transport is all about the ships. 

So how do we listen and receive these ship locations? 
So how do you hear a ship talking over VHF out on the sea off Stad at three
in the morning?

## lyttepostene – The listening posts

So how do you hear a ship talking over VHF out on the sea off Stad at three
in the morning?


[[CLICK]] You build listening posts. We have around ninety base stations, along the
entire coast and on Svalbard. They hear everything from land and forty to
sixty nautical miles out.

[[CLICK]] But the ocean is bigger than that. So in 2010, Kystverket did
something a little unusual for a transport agency. 
They launched a satellite. AISSat-1. Today, Norway has four of them listening to ships from space. 
The latest went up in March this year, and it was built for around NOK 15
million, which when you think about it, it's quite cheap, less than the price of a small seaside apartment here in Oslo.

[[CLICK]] And the result is this. A hundred million messages a day.
Better listening posts, more ships, and more ships with AIS.

[[CLICK]] And everything is stored. All the way back to 2005.
Twenty-one years of every single ship saying where it is, every ten seconds.
It's an archive of the entire Norwegian coastline.

## ais – AIS: built to avoid collisions

The point of these messages was never for anyone on land to listen.

[[CLICK]] AIS stands for Automatic Identification System. Ships broadcast
identity, position, speed, and course over VHF.  The point was for the ships around you to hear it.
So two ships in fog know about each other before they see each 

[[CLICK]] How often they transmit depends on what they're doing. A ship
underway transmits every couple of seconds to every ten seconds. A ship at
berth transmits every three minutes. 

[[CLICK]] And then there's the interesting part. Nobody planned for AIS to
become a data source. It was an anti-collision system. But because every
ship transmits, and because someone started listening and storing, it became
the backbone of traffic monitoring, emergency response, and statistics.

Historical data has become valuable beacuse of insights and analysis, and now our data platform and the technology that makes it possible to process these huge amounts of data into valuable insight.

## sporsmalet – What do you do with 100 million messages a day?

We've built listening posts along the entire coast and
launched satellites

[[CLICK]] What do you do with them? And how do we process them all?

Because this is where it gets hard. Collecting data is the easy part.
Turning it into something someone can use is the hard part. And it's not
just Kystverket sitting with that question. It's the whole industry.

What tech can we use for

## hva-er – Why is everyone building data platforms?

[12:00]

Looking around in the IT industry, in the last couple of years, a new
word has started appearing on job listings. Data platforms.

Municipalities, banks, retail chains, oil companies, and especially the
government institutions. They are all building data platforms.

Why is that?

[[CLICK]] Because data is becoming more and more valuable. Not just for
us, with twenty-one years of every ship on the coast. For everyone.

## reid-hoffman – Everything is measurable

Reid Hoffman. He co-founded LinkedIn.

He put it like this: in the world of data, everything is measurable, and
everything is knowable.

[[CLICK]] And that's the double edge. If everything is measurable, the
data becomes extraordinarily valuable. 

But then you get a really large amount of data. And it becomes a real mess if don't handle it properly.

We've been trying to solve that problem of keeping track of our data for over fifty years. And while we have been solving that problem, the scale of data has been exponentially increasing. 

And right now - a data platform is the latest answer to that problem.

## hvorfor – Data platforms are everywhere

And the fact is,
most services you have been using this week are backed by data platforms .

[[CLICK]] The online store that suggests products that actually fit.
[[CLICK]] The streaming service that recommendation shows for you in the evening.

[[CLICK]] In your bank, fraud detection and anti-money laundering run on
every transaction before it clears.

[[CLICK]] New road projects are planned from years of traffic data, statistical
forecasts of future traffic, and calculations of noise and other measures.
Hundreds of terabytes of data — used to make the best decisions from the
most data.

[[CLICK]] It's happening everywhere. Behind every single one of these is a
platform that ingests, stores, processes, and delivers data.

## batch-streaming – How it works

So how does a data platform actually work?

Then why it's different than a database, warehouse.

## dataflyt – Data flow: sources to consumers

So what is a data platform, really? Let's take the big picture first.

[[CLICK]] Point to the left side. Here are the sources. Operational systems, APIs,
files, sensors. For us: the AIS antennas.

[[CLICK]] And in the middle sits the platform. One shared layer where everything comes
together and becomes one truth.

[[CLICK]] Point to the right side. Here are the people who'll use the data. Apps,
dashboards, machine learning models, analysts.

[[CLICK]] And underneath: monitoring, infrastructure, and how people work together.
That's what keeps the platform running.

I like to think of it as a jigsaw puzzle. Each piece is a little bit of
information about the business. Sales figures, sensor data, positions. On
their own, the pieces say almost nothing. The platform is the table where
you put them together into one picture. Without the table, you just have a
pile of pieces in different boxes.

## arkitektur – Architecture: source to consumer

Now let's open the box in the middle.

No matter which technology you choose, the platform consists of three
building blocks. Storage, which today means cheap, scalable object storage
decoupled from the compute. Processing, meaning the part that transforms raw
data into something usable, both in batch and in real time. And then the
layer underneath everything: catalog and governance.

Point to the bottom layer. That's the layer people forget. Everyone wants
storage and processing. But without a catalog and access control, you don't
get safe self-service. You get chaos. And we'll come back to that layer in a
bit, because that's where platforms actually win or lose.

[[CLICK]] And we have full version control of our data. Raw is archived.
Never deleted. AIS back to 2005. The transforms live in git. Every change
is a commit. You can replay 2018 with the 2018 code, or rerun it with
today's. The archive stays. The code remembers.

## mer-enn-varehus – Is it just a database?

And now comes the objection I always get. Is it just a database? "Don't
we have this already?"

Sure. A database is great at one thing. Structured data. Rows, columns, a
schema everyone agreed on last year. That's the strength.

And that's also the problem. Want a new column? That's a migration. Want
a new shape? That's a meeting, a ticket, and a weekend you're not sure
you want. Changes are slow because the schema is the product.

[[CLICK]] Structured and unstructured. You take the AIS message as it is.
JSON, files, a photo from a camera on the quay.

[[CLICK]] Rollbacks. If Tuesday's version was wrong, you go back to
Monday's. Multiple versions of the data. Not one schema you're afraid
to touch.

[[CLICK]] Rapid iterations. You don't wait for the perfect table. You land
it, try a transform, keep the raw.

That's the data layer. A lakehouse already beats a database there.

[[CLICK]] And then look at the rest of the building. Governance. Audit
logging. You can find the data. Pipelines that run. Compute when you
need it. Developer UIs. A place to execute code. AI. Models.

A database stores rows. It does not give you a catalog, a notebook, a
job, compute, or a model registry.

[[CLICK]] It's a platform.

## mer-enn-varehus-katalog – Catalog. Jobs. Ask. Answer.




 Point at the left. Catalog. Jobs. Compute.
Discover. SQL. Dashboards. That's not a database console.

The list we just went through? It's in the menu.

[[CLICK]] Jobs that run. Not a query window. Pipelines.

[[CLICK]] A catalog you can open. The data has a place, a name, and a
schema you can find without asking around.

[[CLICK]] And then you ask. Same platform. Analyze my data. Create a
skill. The catalog we just saw is what this talks to.

A database does not have a box that says how can I help you.

[[CLICK]] And it answers. Trollfjord. Positions on the eleventh of
August. Fortøyd. Underveis. A map. A table.

You asked. The platform used the catalog, the compute, the data.
That's the whole argument on one screen.

## dataprodukt – Data product

Next concept, and this is one of the most important: the data product.

The idea is that data should be treated as a product. Quality-assured.
Maintained. Documented. And with an owner who actually answers when you
call.

Not a table someone dumped somewhere and forgot.

This is the sentence I want you to take from this whole section.

A data platform is not the product. The data products are. Lakehouse,
pipelines, storage: all of that is there so you can serve data people
can actually use.

Think about a system your company ships to customers. It has an owner,
documentation, support when it breaks, and someone watching whether
users are happy. Now think about a typical dataset in the same company.
No owner. No docs. Use it at your own risk.

That's odd, isn't it? Million-kroner decisions rest on datasets we treat
as byproducts.

The slide says it: a data platform exists to serve data products.
Lakehouse, pipelines, storage. All of that is how you get there.

[[CLICK]] A product has users. And users have expectations. So treat the
datasets people depend on with the same seriousness as the products you
sell.

## dataprodukt-kjennetegn – What makes it a product

So what turns a dataset into a product? Four things.

A named owner. Someone who answers for the content, and has the
mandate to improve it.

[[CLICK]] Documentation: what the fields mean, where the data comes
from, what you can use it for.

[[CLICK]] Quality guarantees. How fresh it is, which tests it has passed,
what consumers can expect. That's the contract. We'll get to that.

[[CLICK]] And known consumers: you know who actually uses the dataset,
so you can warn them before a change breaks something downstream.

Ownership says who. The contract says what. Product thinking says why.

[[CLICK]] And one more thing, before I show you the picture. Not every
dataset. Product treatment costs time. Most datasets are working files
that never get external consumers. Leave them alone. Start with the
handful people lean on.

## dataprodukt-anatomi – More than a table

Let me show you what I mean.

Point to the left side. Here's a file someone put in a bucket. The data in
it might be completely correct. But nobody dares use it.

[[CLICK]] What do the fields mean?

[[CLICK]] How fresh is it?

[[CLICK]] Who do I ask when something looks weird? Have you been there?
I've been there many times. A file in a bucket is not a product. It's an
object.

Point to the right side. Exactly the same data. But packaged.

[[CLICK]] Documentation: what the fields mean.

[[CLICK]] A clear owner. Someone who answers.

[[CLICK]] A data contract. A machine-readable agreement.

[[CLICK]] And access. API, SQL, or BI.

[[CLICK]] Quality tests that run on every row.

[[CLICK]] And freshness. An SLA: fresher than five minutes. Now people
dare to use it.

Think of the difference between loose ingredients and a meal kit. The table
is the ingredient. The data product is the dish, recipe and all.

And one warning. Not everything should be a product. When everything is a
product, nothing is a product. The filter I use: is it shared outside the
team? And is an error expensive enough that it's worth maintaining over
time? If yes to both, it's a product.

## datakontrakt-kapittel – Data contract

And how do you describe a data product? With a data contract.

A contract is an agreement between those who change a dataset and those
who consume it. Shared expectations. That's the whole point.

When data is scattered, poorly documented, and nobody owns it, we spend
our time searching, inspecting, and validating data other people produced.

## datakontrakt-hva – Clear documentation of your data

A data contract is clear documentation of your data.

The contract is a document both humans and machines can read. It clears
expectations both ways. The producer commits to something. The consumers
know what they can rely on.

[[CLICK]] And it's more than a schema. The schema says speed is a number.
The contract says: zero to sixty knots, fresher than five minutes, and
here's who you wake up when it breaks.

That's the difference between "I think that column is in knots" and "I
know it is."

## datakontrakt-innhold – What's in a contract

So what do you actually write down?

Schema. Which fields exist, which types, what's required.

[[CLICK]] Meaning. What the fields mean, and where they come from.

[[CLICK]] Validation rules. Min, max, relationships, tests the data has
to pass.

[[CLICK]] SLAs and governance. How fresh it should be, how sensitive it
is, who owns it.

[[CLICK]] And unlike a wiki page, this one is tested. Machines can check
it. That's why it stays true.

## datakontrakt – Data contract: an API for data

Let me show you what that looks like.

Point to the middle. This is the contract. YAML. Humans can read it.
Machines can read it. Schema, valid values, freshness, ownership, terms.

The producer is on the left. The consumers are on the right. The contract
sits between them. Data only gets through if it matches.

The contract goes both ways. The producer commits to something. The
consumers know what they can rely on.

## datakontrakt-brudd – The contract stops the error early

And here's why it's worth the trouble.

The classic. Someone connects straight to the production database and loads
data from it. Now the database schema has become an API, without anyone
deciding that. The developer changes a column. She has no idea that someone
downstream depends on it. And nobody sends a warning, because nobody knows a
warning is needed.

Point to the top. The change slides silently through. The dashboard breaks.
And the error is discovered three weeks later, downstream, by the wrong
people. Usually by someone who was about to use the number in a meeting.

Point to the bottom. The same change. But now it hits the contract check in
the pull request, and gets stopped before it reaches production. The
contract isn't just documentation. It's tested.

The sentence I want you to take away: a silent break downstream becomes a
loud, early failure. And loud, early failures are the cheapest failures
there are.

## datakatalog – Data catalog

Next: how do you find the products?

In a large organization, data lives in tens of systems, owned by different
teams. Without a shared overview, people spend their time looking. And
decisions get made on different versions of the same ground truth.

The catalog is the map your organization is missing.

## datakatalog-hva – What a catalog is

A data catalog is an overview of the datasets in an organization.

It lets you search, understand, and assess a dataset without asking around
the building, or digging through databases on your own.

[[CLICK]] Search, understand, assess. Without the scavenger hunt.

[[CLICK]] And one important thing. The data still lives in the source
systems. The catalog describes it, and points to where it actually lives.

Most organizations only put finished, published data products in the
catalog. That keeps it tidy. Working files stay out.

## datakatalog-datahub – DataHub

This is what it looks like. DataHub. Open source.

You search. You see domains, platforms, published datasets. You can open
one and see who owns it, what the fields mean, how fresh it is.

[[CLICK]] We picked an open source catalog because it integrates across
many systems, not just one cloud. If you're deep in Microsoft, Purview
does the same job. The gain is the same: a shared overview people
actually use.

## governance – Governance: contracts and catalog

And then there's the word everyone hates. Governance.

I know. It sounds like bureaucracy. But hear me out: governance is what
makes us dare to share data. It's not the brake. It's the brakes that make
you dare to drive fast.

Ownership we already covered. It lives in the data product. What's left
here is the contract and the catalog. [[CLICK]] And then centralized
logging, audit, and reporting. One place, not in every system.

The questions governance has to answer are actually simple. Who has access?
Who had access, and when? Where does the data live? When is it deleted?

Concretely, for us: fishing vessels under fifteen meters and recreational
boats under forty-five meters must not go out in the open data. That's
privacy. And that filter lives in one place in the platform, not in every
single system that uses the data. That's governance in practice.

[[CLICK]] And our tool for this is called Unity Catalog. More on that later.

## roller – Clear roles

As a data platform scales, 
Enforcement of such rules also need clear roles. 


[[CLICK]] Someone has to own and build the platform.

[[CLICK]] Someone has to build the data pipelines and data products —
engineers and analysts.

[[CLICK]] Someone has to be responsible for governance.

[[CLICK]] And then there are the people who'll actually use what comes out —
BI people and consumers.

[[CLICK]] In practice the first three sit together as one data platform team.

The crucial shift is this: from data being something IT handles, to data
being a natural part of the domain responsibility. When the pilots own the
pilotage data, and the emergency response people own the emergency response
data, the data gets better. More relevant. And, most importantly, actually
used.

The value shows up when technology, organization, and responsibility pull in
the same direction. That's the end of the theory part. Now let's look at
what you get out of it.

## effekter – What do you get out of it?

[27:00] Chapter change. What do you actually get out of all this?

I'm going to give you four effects. And I'm not going to give them to you as
PowerPoint bullets. I'm going to give you one concrete example from the sea
route for each.

## effekt-1 – Effect 1: Data quality

One. Data quality. Data you can trust.

[[CLICK]] Data that is tested, quality assured, and updated.

Without a platform, quality is someone's inbox. A test somebody remembers to
run. A spreadsheet that was right last Tuesday.

With a platform, the tests live in the pipeline. Bad rows stop before they
spread. And the data you pull tomorrow is the same data everyone else is
looking at.

## effekt-2 – Effect 2: Compliance

Two. Built-in compliance.

[[CLICK]] Audit logs. PII masking.

The privacy filter I mentioned. Fishing vessels under fifteen meters,
recreational boats under forty-five meters. That's people's workplace and
people's leisure boat, and it must not go out in the open.

Without a platform, every single system using AIS data would have to
remember that rule itself. NAIS, HAIS, the APIs, the emissions model. Four
places to slip up. With a platform, the filter lives in one place, and
everyone downstream gets it for free. Same with the logs. You don't bolt
them on afterwards. They're already there.

## effekt-3 – Effect 3: Self-service

Three. Self-service data.

[[CLICK]] Chat with your data. Order it yourself.

Here's how it used to be: you sent an email to an analyst. "Can I get AIS
data for the Oslofjord in March?" And then you waited. The analyst had
twenty of those in their inbox.

Here's how it is now: you go to hais.kystverket.no. You draw an area on the
map, pick a time range and ship type, and hit order. Then the platform reads
through the history and emails you a Parquet file. Or you ask the data
directly. No humans in the loop. The analyst does analysis instead of
extracts.

## effekt-4 – Effect 4: Future-ready

Four. Future-ready. AI where the data already lives.

[[CLICK]] The model runs where the data already lives. Integrated in your
pipelines.

Everyone's talking about AI. But AI needs data, and the data has to live
somewhere. For us, the emissions model uses neural networks to fill gaps in
the ship registry. And the interesting part isn't the model. The interesting
part is where it runs. On the same platform as the data. In the same
pipelines. With the same access control. Nobody copies data out to a laptop
or a side project.

A good platform is the prerequisite for succeeding with AI. Not the other
way around.

## prosjekt – The story of the project

[32:00] So. Now you have the theory. Let's go back to our ship and tell the
story of how it was actually done.

This is the story of the project. From one source to a platform.

## dag-en – Day one

<!-- TODO Peter: add the start year and actual team size if you want. -->

Day one. What did we have?

[[CLICK]] One source. AIS. Nothing else. No HR data, no finance, no pilotage
data. Just positions.

[[CLICK]] One small team. That's important, and you'll see why in a couple of
slides.

[[CLICK]] And one stream. That never stops. Not at Christmas. Not in a gale.
And not when we deploy. The ships don't care about our release plan. The
messages keep coming regardless, every ten seconds, from every single dot on
the map.

So the first choice was: what do we build on?

## azure-databricks – Azure + Databricks + Terraform

The toolbox we chose. Azure, Databricks, and Terraform.

Two things, very briefly, because this is not a sales pitch. But you should
understand why it fit.

## azure – Azure: the foundation

Azure is the foundation.

[[CLICK]] Storage, networking, and identity as ready-made building blocks.
[[CLICK]] Security, access control, and cost control from day one, not
something we bolt on afterwards.

[[CLICK]] And everything is infrastructure as code. The entire platform can be
recreated from the repo. That sounds obvious to you, but in the public
sector it still isn't.

[[CLICK]] And the most important thing: Azure is boring on purpose. Foundations
should be boring. You don't want an exciting foundation.

## databricks – Databricks: the engine

Databricks is the engine on top.

[[CLICK]] What they call a lakehouse. Data lake and data warehouse in one.
Cheap storage of raw data, and at the same time tables you can run SQL
against.

[[CLICK]] One engine, Spark, for both batch and streaming. Same code, same
tables. We use both, in the same tool. We'll come back to when you choose
which.

[[CLICK]] And Unity Catalog. That's the governance layer from earlier, in
practice. Access control, lineage, catalog. Everything we talked about under
governance lives here.

So. How do we deploy it? Because it's one thing to choose Azure and
Databricks. It's another thing to dare to change it.

## terraform – Terraform: the infrastructure

We don't click around in the portal. We commit.

Remember the sentence on the Azure slide? Everything is infrastructure as
code. The entire platform can be recreated from the repo. Now I'll show you
how.

[[CLICK]] A change starts as a pull request. It lives in git. [[CLICK]] The
pipeline runs terraform plan. Everyone can see what will actually happen
before it happens. [[CLICK]] Merge, then apply. Then it becomes reality.

[[CLICK]] Terraform describes Azure and Databricks. Down to catalogs and
storage containers. Not just the big stuff. Also the buckets the data lands
in.

And the point, like we said before: the entire platform can be recreated
from the repo. Even if someone deletes it. That's an insurance policy. Not a
slogan.

Let me show you what that looks like in the repo. One resource. Three
environments.

## fire-states – Terraform: four states. Four pipelines.

We don't have one Terraform state. We have four deployments. And each one
is duplicated across dev, test, and prod. Four times three. That's twelve.

Why split them? Because one big state is one big blast radius. A mistake
in storage shouldn't tear down the catalog. A change in the workspace
shouldn't touch the account level.

[[CLICK]] Workspace. The Databricks workspace. The one the team logs into.

[[CLICK]] Storage accounts. Storage and containers. Including raw. Where the
data lands before Databricks sees it. Remember that word. Raw. We'll come
back to it when we talk about ingest.

[[CLICK]] Unity Catalog. The catalogs and the access control. Governance as
code.

[[CLICK]] The Databricks account. Account level. Identity, groups, everything
that sits above the workspace.

[[CLICK]] Four deployments. Each one in dev, test, and prod. A change in
storage doesn't tear down the catalog. And a change in dev doesn't touch
prod. That's the whole point of splitting.

And before we go deeper into ingest and the pipelines: what do we actually
build on top of this?

## teknisk-implementasjon – Technical implementation details

Chapter change. Back to how it was actually built. Ingest. The daily job.
How the pipeline is wired.

## terraform-dabs – Infrastructure and logic. Two tools.

And there's one more split. Just as important.

Terraform owns the infrastructure. Databricks Asset Bundles, DABs, own the
logic.

[[CLICK]] Terraform: workspaces, storage, containers. Unity Catalog, down to
the catalog level. We deploy that when the platform changes. Rarely. On
purpose.

[[CLICK]] DABs: schemas, tables, jobs. We deploy that when the code changes.
Often. As it should be.

The split is deliberate. The infrastructure should be boring. The logic
should be easy to change often. If you take one sentence from the Terraform
slides, take that one.

## pyspark-dabs – From PySpark to a pipeline

The models you just saw. MarTraf. MarU. They're not a special system.
They're code.

[[CLICK]] We write them in PySpark. Same Spark you'd write in a notebook.
Python. DataFrames. The H3 joins, the propeller law, the phases. That's the
model.

[[CLICK]] Then we deploy that code to Databricks compute. The data is
already there. Nobody copies a hundred million rows out to a laptop. The
model runs where the lakehouse is.

[[CLICK]] And Databricks Asset Bundles, the DABs from the last slide, wrap
that into a job. A YAML file in git. Schedule. Dev, test, prod. Same idea
as Terraform, but for the logic.

[[CLICK]] So they run as automated pipelines. Every night. A hundred million
rows. Without anyone pressing a button.

## ingest – Ingest happens outside Databricks.

So. The data. Where does it come in?

Ingest happens outside Databricks. Databricks doesn't own the antenna. It
owns what comes after raw
This is because we want to decouple the raw jobs from the processing solution databricks. Meaning databricks can and will probably we replaced at one time in the future. So it's cheaper and more resilient to base the raw ingest pipelines on open source 


[[CLICK]] We use Prefect. A Python library for orchestrating jobs. Not
Databricks jobs. Plain Python jobs.

[[CLICK]] The jobs fetch data and dump it in storage. In raw. Done. In the
containers Terraform just created.

[[CLICK]] Databricks reads from there. The platform begins when the file is
there. Not when the ship transmits. That's a deliberate cut. Ingest is one
responsibility. The lakehouse is another.

## ingest-flyt – Fetch. Dump. Then lakehouse.

Here's what it looks like. From the antenna to something someone can use.

[[CLICK]] The sources. AIS, and the other things we fetch. [[CLICK]] Prefect.
Python jobs, outside Databricks. [[CLICK]] Into storage, into raw. Containers
Terraform has created.

Two responsibilities. Prefect gets the data in. Databricks turns it
into something someone can use. If you mix the two, suddenly the lakehouse
owns the antenna. You don't want that.

[[CLICK]] Into the lakehouse. The classic pattern: bronze, silver, gold. Bronze
is raw messages, exactly as they arrived. Silver is cleaned and
deduplicated. Gold is tracks and aggregates, ready to use. [[CLICK]] And out
again to APIs, dashboards, and analysis.

[[CLICK]] And here's the sentence that's the whole point of this chapter: one
hundred million rows a day, without us operating a single cluster.

How? First, look at what that job actually looks like.

## ais-pipeline – The job that runs every day

This is the Databricks job. AIS orchestration. Production.

Don't read the node names. The audience can see them. Point at the shape.

On the left: import. The raw AIS coming in. Then a previous-month status
check, and a monthly backfill if we need one. Then it fans out. Quality.
Mappings. Static records. Ship info. Then it comes back together into
cleaning, and out to gold.

That's the conceptual pipeline from the last slide, as it actually runs.
One job. Every day. A hundred million rows.

And still: no clusters we have to run.

## stordata-volum – The stream is small, the history is big

Chapter change. Scaling. The stream and the history. How we make the
spatial joins scale. And when you choose batch versus streaming.

Click, click, click through the numbers. Around 5 GB of raw data per day.
Around 1.8 TB per year. Around 40 TB of AIS history, back to 2005.

Daily processing is easy. Twelve hundred rows per second? That's peanuts.
A laptop can handle that.

The heavy part is the history. Twenty-one years. Around 40 TB of positions. A
full historical job is the hard part, because of those 40 TB.

[[CLICK]] And we have to run through that history again. Not once. Every time
something changes. A new version of the emissions model. A new emission
factor. A bug we found in the cleaning. Then all twenty years have to be
recalculated.

## databricks-compute – Clusters are managed VMs in Azure

So how do you actually run those jobs?

Databricks compute. You spin up a cluster. And a cluster is just managed
VMs in Azure. That's the whole trick. Databricks starts them, Databricks
stops them. They live in our subscription.

[[CLICK]] You scale the cluster to the volume. More data, bigger machines.
Or more of them.

[[CLICK]] A terabyte through the job? You need a fairly big VM. Remember the
history? Around 40 TB. That is not a laptop job.

[[CLICK]] And here's the part people get wrong. Not everything has to fit in
memory at the same time. Spark chunks the data. It reads a piece, works on
it, writes it out, takes the next piece.

[[CLICK]] So the VM size is not "does it fit." The VM size is "how long does
it take." Same job. Small cluster, you wait. Big cluster, you get the
answer today.

We spent quite a lot of time getting that scaling just right.

## serverless – No clusters to wake up at night

And then we noticed the problem.

Remember HAIS? One week for one vessel, or every ship for a year. The
scaling needs were not the same job to job.

[[CLICK]] A huge historical load. The last seven days. One ship. Three
different sizes. Tune the cluster for the history job, and the one-ship job
is sitting on a warehouse. Tune it for one ship, and the history job runs
until Friday.

We did quite a lot of that tuning. Spot versus on-demand. Spark settings.
When to scale this job and when to leave that one alone.

[[CLICK]] Then we stopped guessing. Databricks has an autoscaling feature.
They call it serverless. The job decides the size. Not us.

Remember the small team that needed to sleep at night? This is where that
comes in. No clusters to start, patch, or scale. Nobody getting an alert at
four in the morning because a node died.

[[CLICK]] Some jobs went from 36 hours to 4 hours. Same work. Wider when it
needed to be wide.

Serverless is more expensive. It's a managed scaling service, and you pay
for that. We still chose it. We saved so much time that it was definitely
worth it.

For a small team, this is the difference between building a product and
operating infrastructure. We chose product.

## batch-vs-streaming – Batch vs. streaming: the flow

That history job is batch. The daily stream is streaming. A sidenote,
because it's a choice you're going to have to make.

Look at the animation. At the top, batch collects data and moves it at fixed
intervals. Once an hour, once a night. At the bottom, streaming forwards
every event the moment it happens.

And here's the point many people miss: the difference is not about
technology. It's about how fresh the data needs to be. Does the vessel
traffic center need to know where the ship is now? Yes, that's streaming.
Do the climate accounts need to know where the ship was last year? That can
happily run overnight.

## batch-streaming-valg – When do you choose what?

So when do you choose what?

Click through the batch points. Batch fits reports and historical analysis.
Large volumes, because it's cheap. And sources that arrive in chunks anyway,
like a nightly export from an old system.

Click through the streaming points. Streaming fits when you actually have to
react now. Monitoring and alerting. Event-driven automation. And when
freshness matters more than cost.

[[CLICK]] And in practice, you usually need both. My advice: start with batch.
It's simpler and cheaper. Add streaming where fresh data actually changes a
decision. Not because it's cool.

For us, the AIS stream comes in continuously. But much of what we build on
top runs in batch. Both, in the same platform.

## stordata-compute – Days of compute, or hours?

And then the question becomes: how long does that take?

Click through the fixed cluster points. On classic compute, you decide the
size of the cluster before the job starts. A full reprocessing can take
several days. And if you have several jobs like that, they queue up. So you
sit there waiting for Friday.

Click through the autoscaling points. With autoscaling, capacity follows the
amount of data in the job. It scales up where there's a lot to do, and back
down afterwards. Days become hours, because we can go wide.

[[CLICK]] And here's the nuance I want you to take away: the bill ends up about
the same. You pay for the work, not for the time it takes. The difference is
that you get the answer today instead of on Friday. And for the person
waiting for the number, that's the whole difference.

Compute is only half of it. The other half is the question we ask a
hundred million times a day.

## hex-hvorfor – How do you group a coastline?

Remember the pile of points? The job wouldn't scale. Here's why, and
what we did.

How do you group positions by cell?

A square grid looks obvious. But look. A square has eight neighbours, and
they are not the same distance. The corners are farther than the sides.
So "one cell away" means two different things.

[[CLICK]] A hex has six neighbours. All the same distance.
That's why Uber built H3. The planet, tiled in hexes, sixteen resolution
levels. Every AIS point gets a hex ID. The coastline becomes a grid we
can actually count on.

And that's the neighbour part. We don't calculate geodesic distance.
We count cells. One cell away. Two cells away. Same distance every
direction.

## hex-join – A join on a number

And here's why it scales.

Same question, a hundred million times a day. Is this point inside
this area? Near a port. Near a fish farm. Near an oil installation.
Inside the economic zone.

The usual way is geometry. ST_Within. Math on every row. A bounding
box test, then point-in-polygon against every edge. Fine for a thousand
points. Not for a hundred million.

[[CLICK]] H3 is a BIGINT. An integer. It joins and groups like any other
column. A hash join. Geometry never gets touched.

One catch. The hex ID has to already sit on the table you join against.
If you calculate it from lon-lat while the query runs, there is nothing
to prune. The engine has to look at every row anyway. We generate it
once, when the data lands. Then the join is just a number.

We do that on MarTraf, MarU, and KystRisk. Not on HAIS yet. HAIS still
filters the area at query time. Same idea would help there.

The pattern, if you still need the exact answer: prune with the hex join.
Settle the leftovers with geometry afterwards. MarTraf mostly stops at
the hex.

[[CLICK]] We use it at several resolutions. One of them is 8. One cell
is around eleven hundred metres. In practice six to sixteen hundred,
depending on where in the hex you sit.

That is not a fine grid. Resolution 8 sits in the middle of those sixteen
levels. A ship is already tens to hundreds of metres long. "Near a port"
is a kilometre-scale question.

And we accept that. The model only needs inside or outside a threshold.
Not which quay is closest.

One example. Is this ship close to shore? We don't calculate the exact
distance to the land contour. We ask: is it inside a k-ring or two of a
land hex? If yes, is_close_to_shore equals true.

That test, times two billion rows, is much simpler than geodesic distance
on every row.

The phases use the same ruler. A wellboat at a fish farm is one hexagon
and under one knot. Distance is just how many cells away.

## h3-ship – One ship on the hex grid

This is what that looks like for one ship.

The track is just points. Each point lands in a hex.
Distance becomes "how many cells away". That's the join we just talked about.

If our ship is in the same hex as a port, it's at the port.
If it's one cell out, it's nearby. That's the whole test.

Now these cells are very big, but t

## modeller – From positions to emissions

Chapter change. We have the toolbox. Azure, Databricks, Terraform. Before we
go into ingest and the pipelines, here's what we actually use the data for.

MarTraf sits on top of the stream. Then it splits. MarU, KystRisk.
And HAIS, if you just want the history. Tonight we follow our ship
through MarTraf and MarU.

The short version: MarTraf turns positions into voyages. Then several products
can ask different questions of the same voyages.

## modell-flyt – One source, many products

First the architecture, briefly.

[[CLICK]] Raw AIS data in. [[CLICK]] MarTraf cleans and enriches. That's the shared
layer. Voyages, phases, traffic type.

[[CLICK]] Then it splits. MarU calculates energy and emissions. Climate accounts
for the municipalities.

[[CLICK]] KystRisk. Accident risk. Collisions and groundings. The same voyages,
a different question.

[[CLICK]] And here's the point for those of you who build systems. The
predecessor, Havbase, did everything in one model. One big black box. Now
we have one source, and many products on top. MarTraf's output is a product
others can build on.

Recognize that? It's the data product thinking from earlier. In practice.

And a bonus: Havbase was developed and operated by an external partner. MarU
is Kystverket's move to own the assumptions and the calculations themselves.

## hais – HAIS: historical extracts on demand

One more output. Another product. A service on the history. HAIS.

[[CLICK]] Anyone can go to hais.kystverket.no and order up to one year of
historical AIS data. Time range, area as a polygon, ship type, or a single
vessel. [[CLICK]] That starts a job that reads through the history and filters.
[[CLICK]] And the result arrives as GeoParquet or CSV by email.

And here's the point: we don't know in advance what the next order will be.
Is it one vessel for one week? Or every ship for a whole year? The first
takes seconds. The second is a serious job. The job decides the size.
Not us. We don't have to guess.

That's also why we can pull one real ship out of twenty-one years
and watch it move.

## folg-ett-skip – Follow one ship

Now we follow our ship.

[[CLICK]] It's at berth in Bergen. It's 22:40. Zero knots. The AIS transmits
every three minutes, because the ship is standing still.

[[CLICK]] Then it casts off and maneuvers out the Byfjorden. Under three knots.
Now it transmits more often.

[[CLICK]] And then it sets course north. Cruising. Nine knots. And at 03:14 it
passes Stad, in a gale, and sends the message we started with. One point out
of thousands.

[[CLICK]] Off Ålesund, there's no berth available yet. So it anchors. 0.2
knots, drifting a little around the anchor.

[[CLICK]] And at 09:15 it's at berth in Ålesund.

[[CLICK]] Around 3,800 AIS points have become one voyage. Port to port. And
every point has been given a phase. Without the phases, everything is just
"a ship." With them, we know what the ship was doing at every single point.
And that's the difference between noise and knowledge.

Why is the phase so important? An offshore vessel holding position at a
platform uses an enormous amount of energy. The same vessel in dry dock with
its AIS on uses almost nothing. Both are standing still. Without a phase,
they look the same.

## asuka-hais – Asuka, from HAIS

This is Asuka. A real ship. Pulled out of HAIS.

The last slide was the idea. Phases. Port to port. This is what it looks
like when you take one vessel out of the history and watch it move.

Don't narrate every turn. Let it run. Then: that's one ship. We do this
for the whole coast.

And then the obvious question.

## asuka-hvem – Who is Asuka?

Who is Asuka?

Not the ship. The wrestler. Kanako Urai. WWE. I pulled this vessel out of
HAIS because the name made me laugh, and then I ended up on Wikipedia.

That's the whole joke. Back to the model.

## martraf – A pile of points

You just saw one ship become one voyage. Now zoom out.

A hundred million points a day. And twenty-one years of them.
That's a lot of AIS. But as it is, it's almost unusable.
Each point says who, where, how fast. That's it. No voyage. No "this ship
went from Bergen to Ålesund." No structure.

[[CLICK]] To do anything with it, we had to group it. Into chunks.
You can't compute on a hundred million lonely dots. You need a unit of work.

[[CLICK]] The natural chunks were voyages. Port to port.
That's what a ship actually does. That's what MarTraf builds.
Phases, segments, traffic type. All of that sits on the voyage.

[[CLICK]] And then we hit the scaling problem.
Asking "is this point near a port" a hundred million times, with real
geometry, doesn't finish. So we simplified the map.

I'll come back to how. First: what do we do with the voyages?

If you want the five steps later: geographic enrichment, eleven phases,
voyage segments of at least five minutes, complete voyages port to port,
and traffic type.

And now we can ask the next question. What does the ship burn?

## martraf-video – MarTraf on the map

This is MarTraf on the coast.

Don't narrate every cell. Let it run. Then: a hundred million points
became voyages you can actually see. That's the product.

## maru – The maritime emissions model: MarU

So, MarU.

[[CLICK]] A bottom-up model, following the methodology from the IMO's fourth
greenhouse gas study and ICCT. Python and PySpark. And open source, the
entire calculation is on GitHub.

[[CLICK]] The main engine is calculated from the propeller law. Auxiliary
engines and boilers are calculated per operational phase. And now you see
why we needed the phases from MarTraf. A ship at berth uses its auxiliary
engine for power and heat, not the main engine. Without the phase, we
would've calculated wrong.

[[CLICK]] Around 330 input variables. Emission factors, low-load adjustments,
sulfur limits per emission control area, GWP factors. That's a lot of knobs.

[[CLICK]] And the ship registry. Five sources merged, with versioning of
everything that changes. S&P, ShipInfo, SafeSeaNet, NOR and NIS, and the
fishing vessel register. Because a ship changes name, owner, and engine over
its lifetime.

## maru-hvorfor – How was it done earlier?

So how was it done earlier?

[[CLICK]] Sales figures. Statistics Norway calculates emissions from domestic
shipping based on how much fuel was sold.

[[CLICK]] But vessels bunker abroad and sail here. And they bunker here and
sail out. Sales figures describe where the fuel was bought. Not where it was
burned.

[[CLICK]] MarU flips it. Calculate from observed activity instead. And separate
domestic from to-and-from-abroad and transit. Then you know what actually
happened in Norwegian waters.

[[CLICK]] And then the 2016 story, one more time, because now it carries more
weight. The time series starts in 2016. We built out many new base stations
in 2015, and better coverage would've looked like growth in emissions. A
change in the collection propagates all the way out into the statistics.
That's why you need metadata and data contracts. Not just numbers.

## propellloven – The propeller law

And the core of the entire emissions model is three things we already have.

[[CLICK]] Two AIS points. Distance over time. That's the speed of the ship.
Our ship off Stad. Nine knots.

[[CLICK]] And we know the ship. The registry tells us what type it is. How
big. How it was built to sail. A cargo ship is not a fishing boat.

[[CLICK]] Then we estimate what it burned at that speed. Power follows the
cube of speed. Double the speed, and you need eight times the power. Eight
times. That's why shipping companies slow down when fuel gets expensive.
That's why a ship doing nine knots instead of twelve saves enormously.

[[CLICK]] And here's the sentence I want you to remember from this entire talk:
every AIS point becomes an emissions calculation.

That's why one hundred million rows a day isn't bragging. It's a consequence
of the method. If you want to calculate emissions per point, you need every
point.

## maru-hull – Filling the missing ship register data with ML

And now the honest part.

[[CLICK]] The ship register we need to estimate emissions is full of holes.
Especially for the small vessels. We know the ship exists, but not which
engine it has, or how fast it's actually designed to go.

[[CLICK]] The easiest gaps we fill with median values per ship type and length
interval, with at least six observations per group.

[[CLICK]] The harder ones we fill with neural networks. Service speed, RPM, and
stroke type. The RPM even has its own loss function on relative error, to
avoid overfitting on high-RPM engines.

[[CLICK]] And the number that surprised me: around seventy percent of the
vessels in Norwegian waters in 2022 and 2023 were missing fuel type in the
registries. Seventy percent. It's filled in following the IMO's method.

The point: machine learning is used here as a data quality tool. Not as an
AI feature to show off on the front page. As a tool to fill gaps. And it
might be the most useful use of ML I've seen.

[[CLICK]] And it's all open. github.com/Kystverket/maru. You can read the
entire calculation in the break.

## maru-ut – What comes out?

So what comes out the other end?

[[CLICK]] Emissions. CO2 and CO2 equivalents, methane, NOx, SOx, particulate
matter. Plus energy demand, fuel consumption, distance, and operating hours.

[[CLICK]] Broken down by fourteen ship types and nine sizes. 
gross tons are split more finely than before, because Norwegian waters have
a lot of small vessels.

[[CLICK]] Geographically: municipality, county, sea area. 

[[CLICK]] Energy demand
and shore power, which the predecessor didn't include at all. 

[[CLICK]] And
domestic, international, transit.

And that means you can ask questions like this: how much CO2 do the biggest cruise ships emit in Geiranger in July, while they're lying still? We can answer that. Per ship, per month.

And then the big one: the Norwegian Environment Agency - Miljødirektoratet -  is planning to use the MarU figures in the climate accounts for the municipalities. The
platform ends up in official statistics.

## veien-videre – The road ahead

[53:00] Last chapter. Where are we, and where are we going?

And here I'm going to be honest, because that's what makes the story
credible.

## hvor-vi-er – Where we are: one source, one catalog structure

Honest status. Today we have "only" AIS. One source, one domain.

The catalog structure is classic medallion. Three databases in Databricks.
Bronze with raw messages. Silver with cleaned and enriched data. Gold with
tracks, voyages, and emissions, ready to use.

[[CLICK]] And the data products we deliver today all come out of gold. AIS
tracks, MarTraf, MarU, HAIS.

[[CLICK]] This works fine as long as everything is AIS. One source. One
domain. One catalog. That's the honest status. The next slide is why it
can't stay that way.

## flere-domener – Not just AIS

AIS got us here. But Kystverket is bigger than ship positions. We want to
expand. Several domains. Not just AIS.

[[CLICK]] Customs. Declarations and cargo. What the ship actually carried,
not just where it was.

[[CLICK]] Internal HR and finance. Payroll. The ledger. What things cost.

[[CLICK]] Predictive maintenance on the lighthouses. Sensors on the lights
that keep the coast lit. Send a boat out before a light goes dark.

[[CLICK]] And many more. Things we already collect. Other agencies. Whatever
comes next.

[[CLICK]] So one shared bronze, silver, gold won't hold. Who owns what? Who
pays? Who answers when something breaks? We need an architecture that
scales. Shared data has to stay high quality. And people have to find it.
That's the next picture. We'll build it one piece at a time.

## hvor-vi-skal-helhet – Where we're going: the whole picture

Here's the whole thing. One slide. Don't read it, just point.

[[CLICK]] Domains first. Customs, AIS, HR and finance, the lighthouses. Each
with its own catalog, its own team, its own cost center, its own
stewardship.

[[CLICK]] Sources. Each domain ingests its own. Customs has the declarations
and the cargo manifests. AIS has the stream and the ship register. HR and
finance has payroll and the ledger. The lighthouses have sensors and the
maintenance log. The domain ingests them. Not the platform team.

[[CLICK]] Inside each catalog, the same bronze, silver, gold we've had for
AIS. Raw as it arrived. Cleaned and enriched. Ready to use. The pattern
doesn't change. It's repeated once per domain. Nobody touches another
domain's raw data.

[[CLICK]] When a domain wants to share something, it writes a data contract.
Open Data Contract Standard. Id, owner, schema, quality requirements. Owned
by the domain. Not by the platform team.

[[CLICK]] The contract is pushed to one central repo. Pull request. CI
validates the contract against the gold table it points to.

[[CLICK]] And then the part that makes this scale: CI automatically creates a
view in the data products catalog. No copying of data. The view points
straight at the domain's gold table. Consumers only need to know one
catalog, no matter how many domains sit behind it.

[[CLICK]] Who reads from that catalog? Everyone outside the domains. The
Environment Agency and the municipalities with the climate accounts.
Developers through BarentsWatch. Analysts with dashboards. Researchers.
Other agencies. One catalog. Inside or outside, you read from the same
place.

[[CLICK]] And the domains themselves. Customs wants AIS tracks next to the
declarations. They don't go to each other's gold tables. They read from the
data products catalog, like everyone else. Same contract, same view, same
rules.

[[CLICK]] And explorer.kystverket.no, built from the contracts in the same
repo. It knows every product, who owns it, the schema, the quality checks,
the version. Search "ais" and you get the products. Find it in the explorer.
Read it from the catalog.

## domene-effekt – Clear ownership, cost, and stewardship

Three things we get with one domain, one database.

[[CLICK]] Ownership. The domain owns its data and the contract that describes
it. Not "IT."

[[CLICK]] Cost center. Each database has its own storage and its own bill. We
can actually answer what the customs data costs. That's rarer than you
think.

[[CLICK]] Stewardship. It's clear who answers when something breaks, and who
has to give notice when the contract changes.

[[CLICK]] And for consumers, nothing changes. You still find the data products
in one place.

## videre-liste – What we want to achieve

And then what we want to achieve. We work in batch. Not real time. So this
is not about emergency alerts. It's about getting more of what we already
have onto the platform, and using it.

[[CLICK]] More of Kystverkets own data in the data platform. Kystdatahuset has around 130
datasets. Voyages. Things we already collect, that aren't on the platform
yet. The next job is to bring them in.

[[CLICK]] Customs analysis. Another domain coming in. Declarations next to
AIS and voyages. What actually moved, not just where the ship was.

[[CLICK]] Predictive maintenance on the lighthouses. The ones that keep the
coast lit. Sensors, history, when to send a boat out. Not when a light has
already gone dark.

[[CLICK]] And faster, better organization. Clearer ownership. Less waiting.
The platform as a way of working, not just a place to put tables.

But before we wrap up, we're going back to our ship.

## tilbake-til-stad – Back to Stad

Slow pace. This is the ending. Let it land.

It's 03:14.

A ship is in the sea.

[[CLICK]] The sea off Stad. February. A gale from the northwest.

[[CLICK]] A cargo ship heading north at nine knots.

[[CLICK]] We are listening.

And perhaps that is comforting for the ship's crew, sleeping in their beds.
That somewhere out there, in a data platform, we are listening.

And in a month's time, the data will be in a climate accounting software
in the municipality as well.

## takk – Thanks. Try it yourself.

Thank you.

Everything I've shown you is open. The real-time map at nais.kystverket.no.
History on demand at hais.kystverket.no. The raw AIS stream on a TCP port,
no registration, if you want to connect directly. A live API at BarentsWatch
for those of you who want to build something. And the entire emissions model
on GitHub.

Build something with it. And tell me what you built.

The QR takes you to peterbull.no if you want to get in touch.

Questions?
