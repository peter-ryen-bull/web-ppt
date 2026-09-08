# The story of the data platform – speaker notes

Draft: The storytelling device is the mirroring – each phase is an answer to a
concrete problem, and each solution creates the next problem. The groundwork is in
research/historien-om-dataplattform/ (01–05).

The constant that repeats through the whole presentation:
“More people want to ask more questions of more data – faster.”

## forside – The story of the data platform
Opening: “Data platform sounds like a fad. It isn't.
It's just the latest answer to a 60-year-old problem.”

Promise the audience one thing: after this half hour you'll understand WHY
today's platforms look the way they do – not just how.

## tidslinje – Five phases, one problem
Quick flyover: 1970 the database, 1988 the data warehouse, 2006 big data,
2010 the data lake, 2012 the cloud, 2020 the lakehouse. Don't dwell – we'll
go through each of them. Point out that the gaps between the jumps are
shrinking: the technology shifts come closer and closer together.

## moensteret – The pattern that drives the story
This is the key to the whole talk: a problem gets a solution,
the solution creates a new problem – which becomes the next decade's starting point.
The bottleneck keeps moving: from the program, to operations, to the schema,
to the hardware, to the organization.

Ask the audience to look for the pattern in every phase ahead.

## kap-databasen – 1970 · The database
Set the scene: the sixties, punch cards and magnetic tape. Data existed –
but it was trapped inside its applications.

## siloer – Every program owned its own files
Every program had its own file format. The same customer stored in three
places, in three ways – and the numbers don't match.
A new question = a new program = weeks of waiting.

First attempts at a solution: IMS (IBM, the Apollo program!) and IDS –
shared databases, but you had to NAVIGATE the physical structure.
Only experts could ask questions.

## relasjonsmodellen – Codd: separate the question from the storage
Ted Codd, a mathematician at IBM, 1970: organize data in tables that
are joined on shared attributes. Store each fact once.
The radical part: separate WHAT you're asking from WHERE it's stored.

SQL (System R): say what you want, let the database figure out how.
Fun detail: Oracle read IBM's research papers and beat them to
market (1979) – before IBM itself.

## databasen-speil – The database: solved, and a new problem
The mirroring, for the first time: the database gave operations one shared memory.
But it was built for operations – lots of small transactions – not analysis.
Run a heavy report query against the checkout system and the line grows.
And with one system per function, the truth spread out AGAIN.

“Memory isn't the same as insight” – and that takes us to 1988.

## kap-varehuset – 1988 · The data warehouse
Management wants answers ACROSS systems: Which customers are profitable?
What's our total risk? There was nowhere to ask those questions.

## varehuset – One integrated warehouse
The solution: copy data out of the operational systems (ETL, nightly job),
integrate it into ONE warehouse built for questions, not operations.
Inmon's definition: subject-oriented, integrated, time-variant, non-volatile.
Devlin & Murphy (IBM) described the architecture first, in 1988.
Inmon vs. Kimball = the two schools (normalized vs. star schema).

## finans – The banks were first
Why finance? Money IS data – a bank has no physical product.
Risk, fraud, and profitability all need a view across the systems.
Regulation forced history. And: they could afford it –
the Teradata costs were “eye-watering” (Barry Devlin).

First Interstate Bancorp started in 1991 – “two years before anyone knew
the term data warehouse,” as their head of technology put it.

## varehuset-speil – The warehouse: solved, and a new problem
Solved: one truth, history, decisions based on facts.
New: expensive, slow (schema first – a new source took months),
and it only understood rows and columns.

Cliffhanger: “And then came the internet.”

## kap-bigdata – 2006 · Big data
Clickstreams, logs, search, social media. Three things fell short:
volume (petabytes), variety (not rows and columns),
and fault tolerance (with a thousand cheap machines, failure is the norm).

## regnestykket – Google's answer: distribute everything
Jeff Dean's math (2006): the entire web = 400 TB.
One machine reads 30–35 MB/s → four months just to READ it.
A thousand machines → under three hours.

GFS (2003) + MapReduce (2004) → Hadoop (2006, open source).
Big data became available to everyone – not just Google.

## datasjoen – The data lake: store everything, raw
James Dixon (Pentaho), 2010. His analogy is still the best:
the data mart is bottled water – cleaned, packaged, for known questions.
The lake is water in its natural state – you dive in, you take samples.

The core point: the warehouse pre-aggregates and therefore LIMITS
the questions. You store raw data because you don't know tomorrow's
questions.

## sjoen-speil – The lake: solved, and a new problem
Solved: scale, all formats, ML got its raw data.
New: the data swamp – “ingest everything, figure out governance later.
Later never comes.” A lake becomes a swamp when FINDABILITY fails.
And: we ended up with TWO worlds – warehouse for BI, lake for ML.
Duplicate copies, duplicate pipelines, double the bill.

## kap-skyen – 2012 · The cloud
Both the warehouse and Hadoop shared one assumption: you owned the hardware.
Capacity planned years in advance, sized for the peaks.

## skyen – Separate storage and compute
Redshift (2012): the first petabyte warehouse as a pure cloud service –
ten times more demand than AWS had planned for.
Snowflake's move: storage and compute as two independent services.
Several teams on the same data at the same time, without fighting over capacity.
Rent instead of buy, scale instead of plan.

Around the warehouse: the modern data stack (Fivetran, dbt, Looker …) –
powerful, but the tool jungle became its own problem.

## lakehouse – Two tracks meet: the lakehouse
Two tracks across 40 years: the warehouse's order and governance,
the lake's scale and economics. 2020: the lakehouse unites them –
a transactional metadata layer (Delta, Iceberg) ON TOP OF the object storage.
One copy of the data, for both BI and AI.

Data mesh (2019) is the organizational counterpart: ownership out
in the domains, data as a product. Platforms fail organizationally,
not technically.

## arven – The platform, layer by layer
The point of the whole story: today's data platform isn't a gadget
someone invented in 2020. Each layer is the legacy of an era:
SQL and one truth (1970), integrated history (1988), cheap
raw storage (2010), elasticity (2012), ownership (2019),
one governed layer (2020).

## avslutning – The problem remains
Land the story: the bottleneck has been moving for 60 years –
program, operations, schema, hardware, organization.
The constant: more people want to ask more questions of more data, faster.

AI raises the stakes: the models will never be better than the data
the platform serves them. That's why we build data platforms.
