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

| Act | Start | Content |
| --- | --- | --- |
| 1 The opening | 00:00 | scene, signal, NAIS, 100 million, title slide, Peter |
| 2 Who's listening | 05:00 | Kystverket, the vision, the mission, the listening posts, AIS |
| 3 Why a platform | 12:00 | Uber, everyday life, building blocks |
| 3b How a data platform works | | batch/streaming, products, contracts, people |
| 4 What you get out of it | 27:00 | four effects with examples from the sea route |
| 5 The project | 32:00 | day one, the toolbox, terraform, ingest, the stream, the history |
| 6 The models | 43:00 | follow one ship, MarTraf, the propeller law, MarU |
| 7 The road ahead | 53:00 | domains, contracts, back to Stad, thanks |

If you're behind at 27:00, cut the batch/streaming chapter (three slides,
about four minutes). If you're behind at 43:00, cut martraf-valg and
maru-hull.

### Rules for the language in these notes

Spoken. You and we. Short sentences here and there. Ask the audience. No em
dashes. Say it the way you'd say it to a colleague over a coffee.

### Numbers from research

- ~90 base stations, 4 operational AIS satellites (AISSat-4 launched March 2026, about NOK 15 million)
- 2 billion AIS messages in 2006, 8.9 billion in 2021, data stored back to 2006
- Open data under NLOD, real time via the BarentsWatch API and a raw TCP stream
- AIS interval: ships moving at 0 to 14 knots transmit every 10 seconds
- 100 million rows/day ≈ 1,157 per second. Read one per second, and one day's data takes 3.2 years.
- The propeller law: (2)³ = 8. Double the speed, eight times the power.

## scene – It's 03:14

[00:00] Don't say hi. Don't say thanks for the invitation. Go straight into
the scene. Slow pace, let every line land.

It's 03:14.

Click. We're on the sea off Stad. It's February. There's a gale from the
northwest, and it's completely dark. Not dark like Oslo at night. Dark as in
no light anywhere.

Click. Out there, a cargo ship is heading north. Nine knots. Twenty people on
board, most of them asleep. One is standing on the bridge with a cup of
coffee, watching the radar.

Click. And while he stands there, something happens that he doesn't think
about. Something the ship does entirely on its own.

## signal – Every ten seconds, the ship says

Every ten seconds, the ship sends a little message out into the dark.

Click. And the message is actually pretty simple. It says: who I am. Where I
am. How fast I'm going. Where I'm headed. And what I'm doing right now.
Five things. That's all.

Click. Nobody on board thinks about it. Nobody presses a button. The message
just goes. Over VHF, out into the gale, in every direction.

And so the question is: is anyone listening?

## nais – Someone's listening: NAIS

Yes. Someone's listening.

This is the Norwegian coast. Right now. Every single dot on this map is a
ship sending exactly the message I just showed you. Every dot is a crew.
Some of them are ferries with people on their way to work. Some are fishing
boats. Some are cruise ships with three thousand passengers.

Click. And this map is open. nais.kystverket.no. You can open it on your
phone right now and watch your ship go by. Give it a try in the break.

But here comes what I really want to talk about. Look at the number behind
this map.

## hundre-millioner – 100,000,000 every day

One hundred million.

Click. That's how many of these messages go through our system. Every single
day.

Let that sink in for a moment. One hundred million is a number we say
quickly, but it's hard to feel. So let me try to give you a picture.

Click. Imagine you had to read them. One message per second. No sleeping, no
eating, just reading. It would take you over three years to get through one
day's data. And by the time you finished, three more years of reading would
have arrived for every day you spent.

That's the stream this talk is about. And the question is actually pretty
simple: how do you turn one hundred million little messages into something
someone can use?

## forside – Title slide

Now you can breathe out and zoom out. Welcome. This is the story of the data
platform behind the sea route.

And I promise you one thing: this is not a talk about Databricks features.
It's a story about why an agency that runs lighthouses and beacons and pilot
services suddenly found itself with one of the biggest data streams in the
Norwegian public sector, and what we did with it.

We'll start with the big why. Then we'll talk about why everyone's building
data platforms right now. And then we'll go back to our ship off Stad and
follow it all the way into a set of climate accounts.

## om-peter – Peter Bull

Keep it short. The audience came for the story, not the résumé.

My name is Peter. Click. I'm a data platform developer at Miles.

Click. I build the data platform for Kystverket, the Norwegian Coastal
Administration. Before that I've built platforms for both private companies
and public agencies, and what I've learned is that the problems are
surprisingly similar. It's only the data that changes names.

Click. And I work in Azure and Databricks every day, so that's where the
examples come from. But the points apply no matter what you use.

## kystverket – Who's listening? Kystverket

[05:00] So. Who's listening to our ship?

Kystverket. The transport agency for the sea route. Most people know them
for the lighthouses. But the lighthouses are just the visible part.

And before we get into the technology, we need to understand why they do
what they do. Because it's the why that explains all the choices afterwards.

## visjon – The world's safest and cleanest coast

This is Kystverket's vision. The world's safest and cleanest coast.

Not "good maritime safety." Not "efficient administration." The world's
safest and cleanest coast.

Click. And I want you to hold on to that sentence through this whole talk.
Because when we're talking about Delta tables and serverless and data
contracts half an hour from now, it's still this sentence we're working for.
Everything else is the how.

## oppdrag – One mission, two halves

The mission has two halves.

Click. The first is safe and efficient traffic. That's the lighthouses and
beacons and sea marks. That's the pilot service, the local expert who boards
the big ships and helps them in. And that's the vessel traffic centers,
watching the traffic around the clock, just like air traffic controllers,
only for ships.

Click. The other half is emergency response to acute pollution. When a ship
runs aground and oil starts leaking. Then it's Kystverket that leads the
operation. They have depots with oil booms along the whole coast, and ports
of refuge assessed in advance, so nobody has to start searching once things
go wrong.

Click. And here's what I want you to see: both halves start with exactly the
same question. Where are the ships right now? If you want to prevent a
collision, you need to know where the ships are. If you're leading an oil
spill response, you need to know which ships are nearby and can help.
Everything starts with the position.

## lyttepostene – The listening posts

So how do you hear a ship talking over VHF out on the sea off Stad at three
in the morning?

Click. You build listening posts. Around ninety base stations, along the
entire coast and on Svalbard. They hear everything from land and forty to
sixty nautical miles out.

Click. But the ocean is bigger than that. So in 2010, Kystverket did
something a little unusual for a transport agency. They launched a satellite.
AISSat-1. Today, Norway has four of them listening to ships from space. The
latest went up in March this year, and it was built for around NOK 15
million. That's less than many IT projects I've been part of.

Click. And the result is this curve. In 2006, they heard two billion
messages in a year. In 2021, it was 8.9 billion. Better listening posts,
more ships, and more ships with AIS.

Click. And everything is stored. All the way back to 2006. Think about that.
Twenty years of every single ship saying where it is, every ten seconds.
It's an archive of the entire Norwegian sea route.

## ais – AIS: built to avoid collisions

A bit about what AIS actually is, because it explains something important
later.

Click. AIS stands for Automatic Identification System. Ships broadcast
identity, position, speed, and course over VHF. And the point was never for
anyone on land to listen. The point was for the ships around you to hear it.
So two ships in fog know about each other before they see each other.

Click. How often they transmit depends on what they're doing. A ship
underway transmits every couple of seconds to every ten seconds. A ship at
berth transmits every three minutes. It sounds like a detail. It's not. It's
the reason our data is uneven, and we'll come back to that.

Click. And then there's the interesting part. Nobody planned for AIS to
become a data source. It was an anti-collision system. But because every
ship transmits, and because someone started listening and storing, it became
the backbone of traffic monitoring, emergency response, and statistics. It's
a pattern you'll recognize. The best data sources are rarely built to be
data sources.

## sporsmalet – What do you do with 8.9 billion messages?

So let's stop here for a moment.

You're Kystverket. You've built listening posts along the entire coast and
launched satellites. You have 8.9 billion messages a year, and twenty years
of history.

Click. What do you do with them?

Because this is where it gets hard. Collecting data is the easy part.
Turning it into something someone can use is the hard part. And it's not
just Kystverket sitting with that question. It's the whole industry.

## hva-er – Why is everyone building data platforms?

[12:00] Chapter change. Now we'll zoom out from the sea route for a while.

Because you've probably noticed. Everyone's building data platforms now.
Municipalities, banks, retail chains, oil companies. Everyone has a project
with "platform" in the name. Why is that? Is it just because it's trendy?

It's not. It's the latest answer so far to a problem we've been trying to
solve for over fifty years. So before we go to Kystverket: why today's
platforms look the way they do.

## uber – Uber, 2014

And that pattern isn't theory. Uber, 2014.

Click. At the time, Uber had a few terabytes of data. Spread across some
MySQL and Postgres databases. And when someone needed to combine data from
two places, an engineer wrote a script. It worked. Just fine, actually.
Nobody sat around thinking "we need a platform."

Click. Then the company exploded. New cities every week. And suddenly every
team had its own database, its own script, its own version of the truth.
Ask "how many trips did we do yesterday," and you'd get four different
answers. Sound familiar?

Click. And that was the turning point. The silos were in the way of
everything they wanted to do with the data. Not a little in the way. In the
way of everything. The answer was one shared platform. And notice: not
because someone read an article saying it was a good idea. Out of pure
necessity.

Click. And that's really the whole point. You don't need a data platform
from day one. Uber managed fine without one. But past a certain amount of
data, there's no alternative. And at one hundred million rows a day,
Kystverket passed that threshold a long time ago.

## hvorfor – You used four data platforms today

And the fact is, you used several data platforms just getting here today.
Without thinking about it.

Click. The online store that suggests products that actually fit. Click.
The streaming service that nails the recommendation in the evening. Click.
The taxi that gives you a fixed price before you get in, and picks the
fastest route through rush hour. Click. The flight price set in under a
second, based on capacity, profitability, and how likely it is that you,
specifically, will buy.

Click. Behind every single one of these is a platform that ingests, stores,
processes, and delivers data. Without it, the service doesn't exist.

And the NAIS map from the opening? It's exactly the same story. Just for the
sea route.

## dataflyt – Data flow: sources to consumers

So what is a data platform, really? Let's take the big picture first.

Point to the left side. Here are the sources. Operational systems, APIs,
files, sensors. For us: the AIS antennas. Point to the right side. Here are
the people who'll use the data. Apps, dashboards, machine learning models,
analysts.

And in the middle sits the platform. One shared layer where everything comes
together and becomes one truth.

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

## samle-data – Collect, analyze, share

If you remember one sentence about what a data platform does, it's this one.

Collect data from source systems. Click. Analyze it, and share it onwards.

Click. Every definition in the industry lands on the same series of verbs.
Ingest. Store. Transform. Share. And govern access along the way.

And notice that last verb. Govern. That's where most people slip up.

For Kystverket, this means: AIS in, insight and open data out. It's that
simple, and that hard.

## batch-streaming – How it works

A small detour, but an important one. Because it's a choice you're going to
have to make.

There are two ways to move data into a platform. In chunks, or continuously.
Batch or streaming.

## batch-vs-streaming – Batch vs. streaming: the flow

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

Click. And in practice, you usually need both. My advice: start with batch.
It's simpler and cheaper. Add streaming where fresh data actually changes a
decision. Not because it's cool.

For us, the AIS stream comes in continuously. But much of what we build on
top runs in batch. Both, in the same platform.

## mer-enn-varehus – More than a data warehouse

And now comes the objection I always get. "Don't we have this already? We
have a data warehouse."

Sure. And the data warehouse is often one part of the picture. Structured
data, centralized reports. That's good.

A data warehouse delivers reports. Click. A data platform creates value.
Click. Continuously, not just for the monthly report.

The difference in practice: a modern platform handles more types of data,
more types of users, more self-service, and ownership that's spread around
the organization. For us, the same platform serves the dashboard, the APIs,
and the ML models. From the same tables. A classic data warehouse doesn't do
that.

## dataprodukt – Data product

Next concept, and this is one of the most important: the data product.

The idea is that data should be treated as a product. Quality-assured.
Maintained. Documented. And with an owner who actually answers when you
call.

Not a table someone dumped somewhere and forgot.

## dataprodukt-anatomi – More than a table

Let me show you what I mean.

Point to the left side. Here's a file someone put in a bucket. The data in
it might be completely correct. But nobody dares use it. What do the fields
mean? How fresh is it? Who do I ask when something looks weird? Have you
been there? I've been there many times. A file in a bucket is not a product.
It's an object.

Point to the right side. Exactly the same data. But packaged with
documentation, a clear owner, quality tests, an agreement on how fresh it
should be, and access via API, SQL, or BI. Now people dare to use it.

Think of the difference between loose ingredients and a meal kit. The table
is the ingredient. The data product is the dish, recipe and all.

And one warning. Not everything should be a product. When everything is a
product, nothing is a product. The filter I use: is it shared outside the
team? And is an error expensive enough that it's worth maintaining over
time? If yes to both, it's a product.

## datakontrakt – Data contract: an API for data

And how do you describe a data product? With a data contract.

You're developers. You know what an API is. Think API, but for data. The
contract is a document both humans and machines can read. Schema, valid
values, freshness, ownership, terms.

And it's more than a schema. The schema says speed is a number. The contract
says: zero to sixty knots, fresher than five minutes, and here's who you
wake up when it breaks.

The contract goes both ways. The producer commits to something. The
consumers know what they can rely on. That's the whole difference between
"I think that column is in knots" and "I know it is."

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

## governance – Governance: contracts, ownership, catalog

And then there's the word everyone hates. Governance.

I know. It sounds like bureaucracy. But hear me out: governance is what
makes us dare to share data. It's not the brake. It's the brakes that make
you dare to drive fast.

Three things: data contracts, data ownership, data catalog. Click. And then
centralized logging, audit, and reporting. One place, not in every system.

The questions governance has to answer are actually simple. Who has access?
Who had access, and when? Where does the data live? When is it deleted?

Concretely, for us: fishing vessels under fifteen meters and recreational
boats under forty-five meters must not go out in the open data. That's
privacy. And that filter lives in one place in the platform, not in every
single system that uses the data. That's governance in practice.

Click. And our tool for this is called Unity Catalog. More on that later.

## feiler-organisatorisk – Platforms fail on people

Now comes the uncomfortable part.

Data platforms rarely fail on technology. Click. They fail on people.

You can buy the best technology. You can draw the prettiest architecture.
And you can still end up with exactly the same problems as before.

Why? Because the platform gets treated as an IT project. Nobody's
responsible for actually creating value. The business side doesn't take
ownership of its own data. And competence building gets underestimated.

A platform is a new way of working. It requires IT and the business side to
talk to each other in a different way than before. Hence the next slide.

## roller – Clear roles

Roles before technology.

Click. Someone has to own the platform. Click. Someone has to build on it,
engineers and analysts. Click. Someone has to be responsible for governance.
Click. And then there are the people who'll actually use what comes out, BI
people and consumers.

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

## effekt-1 – Effect 1: Quality

One. Quality. Data you dare to make decisions on.

Click. Here's the example. Our emissions figures start in 2016. Not because
we lack data before that. We have everything back to 2006. But in 2015,
Kystverket built out many new base stations. Better coverage. More ships
heard.

And what would've happened if we started the time series in 2014? It
would've looked like emissions exploded in 2015. But it wasn't the ships
that changed. It was our ears.

That knowledge lives in the platform. In metadata, in the dataset's
documentation. Not in the head of one person who might quit next year.

## effekt-2 – Effect 2: Compliance

Two. Compliance. The rules are built in once, in one place.

Click. The privacy filter I mentioned. Fishing vessels under fifteen meters,
recreational boats under forty-five meters. That's people's workplace and
people's leisure boat, and it must not go out in the open.

Without a platform, every single system using AIS data would have to
remember that rule itself. NAIS, HAIS, the APIs, the emissions model. Four
places to slip up. With a platform, the filter lives in one place, and
everyone downstream gets it for free.

## effekt-3 – Effect 3: Efficiency

Three. Efficiency. Self-service instead of ordering.

Click. Here's how it used to be: you sent an email to an analyst. "Can I get
AIS data for the Oslofjord in March?" And then you waited. The analyst had
twenty of those in their inbox.

Here's how it is now: you go to hais.kystverket.no. You draw an area on the
map, pick a time range and ship type, and hit order. Then the platform reads
through the history and emails you a Parquet file. No humans in the loop.
The analyst does analysis instead of extracts.

## effekt-4 – Effect 4: Future-ready

Four. Future-ready. AI where the data already lives.

Click. Everyone's talking about AI. But AI needs data, and the data has to
live somewhere. For us, the emissions model uses neural networks to fill
gaps in the ship registry. And the interesting part isn't the model. The
interesting part is where it runs. On the same platform as the data. With
the same access control. Nobody copies data out to a laptop or a side
project.

A good platform is the prerequisite for succeeding with AI. Not the other
way around.

## prosjekt – The story of the project

[32:00] So. Now you have the theory. Let's go back to our ship and tell the
story of how it was actually done.

This is the story of the project. From one source to a platform.

## dag-en – Day one

<!-- TODO Peter: add the start year and actual team size if you want. -->

Day one. What did we have?

Click. One source. AIS. Nothing else. No HR data, no finance, no pilotage
data. Just positions.

Click. One small team. Who also needed to sleep at night. That's important,
and you'll see why in a couple of slides.

Click. And one stream. That never stops. Not at Christmas. Not in a gale.
And not when we deploy. The ships don't care about our release plan. The
messages keep coming regardless, every ten seconds, from every single dot on
the map.

So the first choice was: what do we build on?

## azure-databricks – Azure + Databricks

The toolbox we chose. Azure and Databricks.

Two things, very briefly, because this is not a sales pitch. But you should
understand why it fit.

## azure – Azure: the foundation

Azure is the foundation.

Click. Storage, networking, and identity as ready-made building blocks.
Click. Security, access control, and cost control from day one, not
something we bolt on afterwards.

Click. And everything is infrastructure as code. The entire platform can be
recreated from the repo. That sounds obvious to you, but in the public
sector it still isn't.

Click. And the most important thing: Azure is boring on purpose. Foundations
should be boring. You don't want an exciting foundation.

## databricks – Databricks: the engine

Databricks is the engine on top.

Click. What they call a lakehouse. Data lake and data warehouse in one.
Cheap storage of raw data, and at the same time tables you can run SQL
against.

Click. One engine, Spark, for both batch and streaming. Same code, same
tables. Remember the batch-or-streaming question? Here we don't have to pick
one. We use both, in the same tool.

Click. And Unity Catalog. That's the governance layer from earlier, in
practice. Access control, lineage, catalog. Everything we talked about under
governance lives here.

So. How do we deploy it? Because it's one thing to choose Azure and
Databricks. It's another thing to dare to change it.

## terraform – We don't click. We commit.

We don't click around in the portal. We commit.

Remember the sentence on the Azure slide? Everything is infrastructure as
code. The entire platform can be recreated from the repo. Now I'll show you
how.

Click. A change starts as a pull request. It lives in git. Click. The
pipeline runs terraform plan. Everyone can see what will actually happen
before it happens. Click. Merge, then apply. Then it becomes reality.

Click. Terraform describes Azure and Databricks. Down to catalogs and
storage containers. Not just the big stuff. Also the buckets the data lands
in.

And the point, like we said before: the entire platform can be recreated
from the repo. Even if someone deletes it. That's an insurance policy. Not a
slogan.

## fire-states – Four states. Four pipelines.

We don't have one Terraform state. We have four.

Why? Because one big state is one big blast radius. A mistake in storage
shouldn't tear down the catalog. A change in the workspace shouldn't touch
the account level.

Click. Workspace. The Databricks workspace. The one the team logs into.

Click. Storage accounts. Storage and containers. Including raw. Where the
data lands before Databricks sees it. Remember that word. Raw. We'll come
back to it in two slides.

Click. Unity Catalog. The catalogs and the access control. Governance as
code.

Click. The Databricks account. Account level. Identity, groups, everything
that sits above the workspace.

Click. Four states. Four pipelines. A change in storage doesn't tear down
the catalog. That's the whole point of splitting.

## terraform-dabs – Infrastructure and logic. Two tools.

And there's one more split. Just as important.

Terraform owns the infrastructure. Databricks Asset Bundles, DABs, own the
logic.

Click. Terraform: workspaces, storage, containers. Unity Catalog, down to
the catalog level. We deploy that when the platform changes. Rarely. On
purpose.

Click. DABs: schemas, tables, jobs. We deploy that when the code changes.
Often. As it should be.

Click. The split is deliberate. The infrastructure should be boring. The
logic should be easy to change often. If you take one sentence from the last
three slides, take that one.

## ingest – Ingest happens outside Databricks.

So. The data. Where does it come in?

Ingest happens outside Databricks. Databricks doesn't own the antenna. It
owns what comes after raw.

Click. We use Prefect. A Python library for orchestrating jobs. Not
Databricks jobs. Plain Python jobs.

Click. The jobs fetch data and dump it in storage. In raw. Done. In the
containers Terraform just created.

Click. Databricks reads from there. The platform begins when the file is
there. Not when the ship transmits. That's a deliberate cut. Ingest is one
responsibility. The lakehouse is another.

## ingest-flyt – Fetch. Dump. Then lakehouse.

Here's what it looks like.

Click. The sources. AIS, and the other things we fetch. Click. Prefect.
Python jobs, outside Databricks. Click. Into storage, into raw. Containers
Terraform has created. Click. Databricks reads raw and writes bronze.

Click. Two responsibilities. Prefect gets the data in. Databricks turns it
into something someone can use. If you mix the two, suddenly the lakehouse
owns the antenna. You don't want that.

## strommen – 100 million rows. Every day.

So. Back to the number.

One hundred million rows. Click. Every day.

Now we'll actually see how it works.

## regnestykke – The math

Let's do some math.

One hundred million a day is around twelve hundred rows per second. Around
the clock. Click. That's 36.5 billion rows a year.

Click. And each of those rows is one ship saying: here I am, this is how
fast I'm going, this is where I'm headed. They're not abstract rows. They're
our ship off Stad. They're the ferry taking people to work. They're people.

I say that because it's easy to get fascinated by the volume and forget
what's in it.

## pipeline – From antenna to insight

Here's what the flow looks like.

Click. The AIS network. The base stations and the satellites. Click.
Prefect. The jobs outside Databricks, dumping to raw. Click. Into the
lakehouse, where we use the classic pattern: bronze, silver, gold. Bronze is
raw messages, exactly as they arrived. Silver is cleaned and deduplicated.
Gold is tracks and aggregates, ready to use. Click. And out again to APIs,
dashboards, and analysis.

Click. And here's the sentence that's the whole point of this chapter: one
hundred million rows a day, without us operating a single cluster.

How?

## serverless – No clusters to wake up at night

Serverless.

Remember the small team that needed to sleep at night? This is where that
comes in.

Click. No clusters to start, patch, or scale. Nobody getting an alert at
four in the morning because a node died. Click. Capacity follows the stream.
There's more traffic in the daytime than at night, more in summer than in
winter, and the platform scales up and down by itself.

Click. And we pay for what we use. Not for what we fear we might need.
That's a big difference for a public agency with a budget.

For a small team, this is the difference between building a product and
operating infrastructure. We chose product.

## stordata-volum – The stream is small, the history is big

<!-- TODO Peter: fill in the volume numbers in the VOLUM constant in stordata.tsx:
     GB per day for 100 million rows, TB per year, and total history since 2006. -->

And now I'm going to say something that might surprise you.

Click, click, click through the numbers.

The stream isn't the heavy part. Twelve hundred rows per second? That's
peanuts. A laptop can handle that.

The heavy part is the history. Twenty years. Several terabytes of positions.

Click. And here's what makes it hard: we have to run through that history
again. Not once. Every time something changes. A new version of the
emissions model. A new emission factor. A bug we found in the cleaning. Then
all twenty years have to be recalculated.

## stordata-compute – Days of compute, or hours?

And then the question becomes: how long does that take?

Click through the fixed cluster points. On classic compute, you decide the
size of the cluster before the job starts. A full reprocessing can take
several days. And if you have several jobs like that, they queue up. So you
sit there waiting for Friday.

Click through the autoscaling points. With autoscaling, capacity follows the
amount of data in the job. It scales up where there's a lot to do, and back
down afterwards. Days become hours, because we can go wide.

Click. And here's the nuance I want you to take away: the bill ends up about
the same. You pay for the work, not for the time it takes. The difference is
that you get the answer today instead of on Friday. And for the person
waiting for the number, that's the whole difference.

## hais – HAIS: historical extracts on demand

A concrete example of why this fits so well. HAIS.

Click. Anyone can go to hais.kystverket.no and order up to one year of
historical AIS data. Time range, area as a polygon, ship type, or a single
vessel. Click. That starts a job that reads through the history and filters.
Click. And the result arrives as GeoParquet or CSV by email.

Click. And here's the point: we don't know in advance what the next order
will be. Is it one vessel for one week? Or every ship for a whole year? The
first takes seconds. The second is a serious job. With serverless, the job
decides the size. Not us. We don't have to guess.

## modeller – From positions to emissions

[43:00] Chapter change. Now we have the stream. We have the history. What do
we use it for?

Two models on top of the platform. MarTraf, the maritime traffic model. And
MarU, the maritime emissions model.

The short version: MarTraf turns positions into voyages. MarU turns voyages
into emissions. And now we'll follow our ship through both.

## modell-flyt – Four modules, not one model

First the architecture, briefly.

Click. Raw AIS data in. Click. MarTraf cleans and enriches. Click. MarU
calculates energy and emissions. Click. And out comes statistics and climate
accounts, broken down by municipality, county, and sea area.

Click. And here's the point for those of you who build systems. The
predecessor, Havbase, did everything in one model. One big black box. MarU
is split into four decoupled modules: AIS processing, ship registry,
geography, and emissions calculation. Each module has its own responsibility
and its own output that others can build on.

Recognize that? It's the data product thinking from earlier. In practice.

And a bonus: Havbase was developed and operated by an external partner. MarU
is Kystverket's move to own the assumptions and the calculations themselves.

## folg-ett-skip – Follow one ship

Now we follow our ship.

Click. It's at berth in Bergen. It's 22:40. Zero knots. The AIS transmits
every three minutes, because the ship is standing still.

Click. Then it casts off and maneuvers out the Byfjorden. Under three knots.
Now it transmits more often.

Click. And then it sets course north. Cruising. Nine knots. And at 03:14 it
passes Stad, in a gale, and sends the message we started with. One point out
of thousands.

Click. Off Ålesund, there's no berth available yet. So it anchors. 0.2
knots, drifting a little around the anchor.

Click. And at 09:15 it's at berth in Ålesund.

Click. Around 3,800 AIS points have become one voyage. Port to port. And
every point has been given a phase. Without the phases, everything is just
"a ship." With them, we know what the ship was doing at every single point.
And that's the difference between noise and knowledge.

Why is the phase so important? An offshore vessel holding position at a
platform uses an enormous amount of energy. The same vessel in dry dock with
its AIS on uses almost nothing. Both are standing still. Without a phase,
they look the same.

## martraf – The maritime traffic model: MarTraf

MarTraf is what does this job. Databricks, PySpark. Five steps.

Click. Geographic enrichment. Every point learns where it is relative to
ports, the coastline, anchoring areas, and oil installations.

Click. Operational phase. Eleven phases, set with rules on distance and
speed. What you saw on the previous slide.

Click. Voyage segments. Continuous sequences where the ship is either
underway or not. And an important rule: never shorter than five minutes.
Why? Because the speed flickers around the threshold, and without that rule
you get hundreds of meaningless little segments.

Click. Complete voyages, port to port. With handling of gaps in the signal,
because if we lose the ship for ten minutes, it shouldn't become two
voyages.

Click. And traffic type. Domestic, to or from abroad, or transit. That
becomes important for the climate accounts.

## martraf-valg – The choices that make it possible

Two technical choices I want to dwell on, because you're developers.

Click. Full resolution. No downsampling before processing. It's tempting to
thin out the data first, because there's a lot of it. But if you downsample
first, you risk keeping the noise and throwing away the valid points. We
have the compute. So we use it.

Click. H3 indexing. That's the built-in geospatial functions in Databricks.
The world is divided into hexagons, and spatial joins get fast. But you
don't get exact distance. Two points are either in the same hexagon or N
cells apart. At resolution eight, "one cell away" is around eleven hundred
meters. In practice between six hundred and sixteen hundred, depending on
where in the hexagon you are.

Click. And that loss of precision is accepted with open eyes. The model only
needs to know inside or outside a threshold. Not which object is closest.
It's a good example of performance being a valid architecture criterion, as
long as you know what you're giving up.

## propellloven – The propeller law

Now we get to emissions. And the core of the entire emissions model is an
equation simple enough to say out loud.

Load equals speed divided by service speed, cubed. The propeller law.

Click. And think about what cubed means. Double the speed, and you need
eight times the power. Eight times. That's why shipping companies slow down
when fuel gets expensive. That's why a ship doing nine knots instead of
twelve saves enormously.

Click. Then we multiply by installed power, a factor of 0.85, and the time
since the previous AIS message.

Click. And here's the sentence I want you to remember from this entire talk:
every AIS point becomes an emissions calculation.

That's why one hundred million rows a day isn't bragging. It's a consequence
of the method. If you want to calculate emissions per point, you need every
point.

## maru – The maritime emissions model: MarU

So, MarU.

Click. A bottom-up model, following the methodology from the IMO's fourth
greenhouse gas study and ICCT. Python and PySpark. And open source, the
entire calculation is on GitHub.

Click. The main engine is calculated from the propeller law. Auxiliary
engines and boilers are calculated per operational phase. And now you see
why we needed the phases from MarTraf. A ship at berth uses its auxiliary
engine for power and heat, not the main engine. Without the phase, we
would've calculated wrong.

Click. Around 330 input variables. Emission factors, low-load adjustments,
sulfur limits per emission control area, GWP factors. That's a lot of knobs.

Click. And the ship registry. Four sources merged, with versioning of
everything that changes. Because a ship changes name, owner, and engine over
its lifetime.

## maru-hull – ML as a data quality tool

And now the honest part.

Click. The ship registries are full of holes. Especially for the small
vessels. We know the ship exists, but not which engine it has, or how fast
it's actually designed to go.

Click. The easiest gaps we fill with median values per ship type and length
interval, with at least six observations per group.

Click. The harder ones we fill with neural networks. Service speed, RPM, and
stroke type. The RPM even has its own loss function on relative error, to
avoid overfitting on high-RPM engines.

Click. And the number that surprised me: around seventy percent of the
vessels in Norwegian waters in 2022 and 2023 were missing fuel type in the
registries. Seventy percent. It's filled in following the IMO's method.

The point: machine learning is used here as a data quality tool. Not as an
AI feature to show off on the front page. As a tool to fill gaps. And it
might be the most useful use of ML I've seen.

Click. And it's all open. github.com/Kystverket/maru. You can read the
entire calculation in the break.

## maru-ut – What comes out?

So what comes out the other end?

Click. Emissions. CO2 and CO2 equivalents, methane, NOx, SOx, particulate
matter. Plus energy demand, fuel consumption, distance, and operating hours.

Click. Broken down by fourteen ship types and nine sizes. Those under 5,000
gross tons are split more finely than before, because Norwegian waters have
a lot of small vessels.

Click. Geographically: municipality, county, sea area. Click. Energy demand
and shore power, which the predecessor didn't include at all. Click. And
domestic, international, transit.

And that means you can ask questions like this: how much CO2 do the biggest
cruise ships emit in Geiranger in July, while they're lying still? We can
answer that. Per ship, per month.

And then the big one: the Norwegian Environment Agency is planning to use
the MarU figures in the climate accounts for the municipalities. The
platform ends up in official statistics. The message from our ship off Stad
ends up in the climate accounts of Stad municipality.

## maru-hvorfor – Why not just use sales numbers?

Now someone might ask: why make this so complicated? We know how much fuel
is sold.

Click. Yes. And that's how it's been done. Statistics Norway calculates
emissions from domestic shipping based on sales figures from fuel sellers.

Click. But vessels bunker abroad and sail here. And they bunker here and
sail out. Sales figures describe where the fuel was bought. Not where it was
burned.

Click. MarU flips it. Calculate from observed activity instead. And separate
domestic from to-and-from-abroad and transit. Then you know what actually
happened in Norwegian waters.

Click. And then the 2016 story, one more time, because now it carries more
weight. The time series starts in 2016. We built out many new base stations
in 2015, and better coverage would've looked like growth in emissions. A
change in the collection propagates all the way out into the statistics.
That's why you need metadata and data contracts. Not just numbers.

## veien-videre – The road ahead

[53:00] Last chapter. Where are we, and where are we going?

And here I'm going to be honest, because that's what makes the story
credible.

## hvor-vi-er – Where we are: one source, one catalog structure

Honest status. Today we have "only" AIS. One source, one domain.

The catalog structure is classic medallion. Three catalogs in Unity Catalog.
Bronze with raw messages. Silver with cleaned and enriched data. Gold with
tracks, voyages, and emissions, ready to use.

Click. And the data products we deliver today all come out of gold. AIS
tracks, MarTraf, MarU, HAIS.

Click. This works fine as long as everything is AIS. But over the next year,
more domains are coming in. Customs. HR and finance. Predictive maintenance
of lighthouses. And then one shared bronze, silver, gold won't hold. Who
owns what? Who pays? Who answers when something breaks? That requires
stricter structure. And a fair bit of rewriting. That's okay to say out
loud.

## hvor-vi-skal – Where we're going: domain catalogs and data products

Here's what it's going to look like.

Point to the left side. One catalog per domain. Customs, AIS, HR and
finance, predictive maintenance. Each domain has its own bronze, silver,
gold inside. Its own team. Its own cost center. Its own stewardship.

Click. When a domain wants to share something, it writes a data contract.
Open Data Contract Standard, a YAML file with id, owner, schema, and quality
requirements. And the contract is owned by the domain. Not by the platform
team.

Click. The contract is pushed to one central repo. Pull request. CI
validates the contract against the gold table it points to.

Click. And then the part that makes this scale: CI automatically creates a
view in the central data product catalog. No manual ordering. No copying of
data. The view points straight at the domain's gold table.

Click. The same pattern for every domain. Consumers only need to know one
catalog, no matter how many domains sit behind it.

Click. Data split by domain. Clear ownership, clear cost center, clear
stewardship. This is the data contract and governance chapter from earlier,
put into a system.

## domene-effekt – Clear ownership, cost, and stewardship

Three things we get with domain catalogs.

Click. Ownership. The domain owns its data and the contract that describes
it. Not "IT."

Click. Cost center. Each catalog has its own storage and its own bill. We
can actually answer what the customs data costs. That's rarer than you
think.

Click. Stewardship. It's clear who answers when something breaks, and who
has to give notice when the contract changes.

Click. And for consumers, nothing changes. You still find the data products
in one place.

## videre-liste – What we want to achieve

And then what we want to achieve.

Click. More sources in. SafeSeaNet with port call notifications, pilotage
data, geodata. Click. Data products with data contracts, machine-readable
agreements. Click. Real-time alerting for emergency response and the
environment. Click. Machine learning on the stream: arrival prediction and
anomaly detection.

Click. And even more open data. For you. Because all of this is open under
NLOD, and some of the best things built on the AIS data were built by people
outside Kystverket.

But before we wrap up, we're going back to our ship.

## tilbake-til-stad – Back to Stad

Slow pace. This is the ending. Let it land.

It's 03:14.

Our ship is passing Stad. A gale, darkness, one man on the bridge with a cup
of coffee. And every ten seconds, a little message goes out into the dark.

Click. Ten seconds later, that message is in the platform. Cleaned.
Enriched. With a phase, a voyage, a traffic type.

Click. In a year, it's in the climate accounts of a municipality. Together
with a hundred million other messages. Which together tell how Norway
actually uses the sea route.

Click. And nobody on board knows. They just sail.

That's what a data platform is. Not Databricks, not Azure, not Delta tables.
It's the path from one little signal in the dark to something a human can
make a decision on. The world's safest and cleanest coast. One message at a
time.

## takk – Thanks. Try it yourself.

<!-- TODO Peter: add email or LinkedIn if you want it on the slide. -->

Thank you.

Everything I've shown you is open. The real-time map at nais.kystverket.no.
History on demand at hais.kystverket.no. The raw AIS stream on a TCP port,
no registration, if you want to connect directly. A live API at BarentsWatch
for those of you who want to build something. And the entire emissions model
on GitHub.

Build something with it. And tell me what you built.

Questions?
