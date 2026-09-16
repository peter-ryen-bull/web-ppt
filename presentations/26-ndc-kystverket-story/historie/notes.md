# The story of the data platform – speaker notes

Draft: Each phase is an answer to a concrete problem, and each solution
creates the next problem. The groundwork is in
research/historien-om-dataplattform/ (01–05).

The constant:
“More people want to ask more questions of more data – faster.”

## forside – The story of the data platform

Data platform sounds like a fad. It isn't.
It's just the latest answer to a 50-year-old problem.

## tidslinje – Five phases, one problem

1970 the database, 1988 the data warehouse, 2006 big data,
2010 the data lake, 2012 the cloud, 2020 the lakehouse.

Don't dwell – two slides per era, then we move on.
The gaps between the jumps are shrinking.

The pattern to look for: a problem gets a solution, the solution
creates a new problem – which becomes the next decade's starting point.
The bottleneck keeps moving: from the program, to operations, to the
schema, to the hardware, to the organization.

## relasjonsmodellen – 1970 · The database

Set the scene fast: the sixties, punch cards and magnetic tape.
Every program owned its own files. The same customer in three places,
in three formats – and the numbers don't match. A new question meant
a new program.

Ted Codd, IBM, 1970: tables joined on shared attributes. Store each
fact once. The radical part: separate WHAT you're asking from WHERE
it's stored. SQL: say what you want, let the database figure out how.

Fun detail: Oracle read IBM's papers and beat them to market (1979).

## databasen-speil – The database: solved, and a new problem

The database gave operations one shared memory.
But it was built for operations – lots of small transactions – not analysis.
Run a heavy report against the checkout system and the line grows.
And with one system per function, the truth spread out again.

“Memory isn't the same as insight.”

## varehuset – 1988 · The data warehouse

Management wants answers ACROSS systems: Which customers are profitable?
What's our total risk? Copy data out of the operational systems (ETL,
nightly job) into ONE warehouse built for questions, not operations.

Inmon: subject-oriented, integrated, time-variant, non-volatile.
Devlin & Murphy described the architecture in 1988.
Banks were first – because money is data. Risk, fraud, profitability,
and regulation all need a view across systems. They could also afford
the “eye-watering” Teradata bill.

## varehuset-speil – The warehouse: solved, and a new problem

Solved: one truth, history, decisions based on facts.
New: expensive, slow (schema first – a new source took months),
and it only understood rows and columns.

Cliffhanger: “And then came the internet.”

## regnestykket – 2006 · Big data

Clickstreams, logs, search, social media. Volume, variety, and
fault tolerance all broke the warehouse.

Jeff Dean's math (2006): the entire web = 400 TB.
One machine reads 30–35 MB/s → four months just to READ it.
A thousand machines → under three hours.

GFS + MapReduce → Hadoop (2006, open source). Big data left Google.

## datasjoen – 2010 · The data lake

James Dixon (Pentaho), 2010: the data mart is bottled water – cleaned,
packaged, for known questions. The lake is water in its natural state.

The warehouse pre-aggregates and therefore LIMITS the questions.
You store raw data because you don't know tomorrow's questions.

## sjoen-speil – The lake: solved, and a new problem

Solved: scale, all formats, ML got its raw data.
New: the data swamp – “ingest everything, figure out governance later.
Later never comes.” A lake becomes a swamp when FINDABILITY fails.
And: two worlds – warehouse for BI, lake for ML. Double the copies,
double the bill.

## skyen – 2012 · The cloud

Both the warehouse and Hadoop assumed you owned the hardware,
sized for the peaks.

Redshift (2012): the first petabyte warehouse as a cloud service.
Snowflake's move: storage and compute as two independent services.
Several teams on the same data at the same time. Rent instead of buy.

## lakehouse – 2020 · The lakehouse

Two tracks across 40 years: the warehouse's order and governance,
the lake's scale and economics. The lakehouse unites them –
a transactional metadata layer (Delta, Iceberg) on top of object storage.
One copy of the data, for both BI and AI.

Today's platform isn't a gadget from 2020. Each layer is the legacy
of an era: SQL (1970), integrated history (1988), cheap raw storage
(2010), elasticity (2012), one governed layer (2020).

Data mesh (2019) is the organizational counterpart: ownership out
in the domains. Platforms fail organizationally, not technically.

## avslutning – Data lasts longer than the systems

Tim Berners-Lee said it: data is a precious thing, and it will last
longer than the systems themselves.

That's the whole history in one sentence. The database, the warehouse,
the lake, the cloud, the lakehouse. We keep replacing the systems.
The data is still here. AIS messages from 2005 are still here.

[[CLICK]] So we don't model the data to fit today's system.
We model the systems to fit the data. That's why we build a platform.
