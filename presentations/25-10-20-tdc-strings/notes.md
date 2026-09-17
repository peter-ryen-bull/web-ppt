# Speaker notes – TDC 20. oktober 2025

Importert fra `2025_10_20_tdc-strings.pptx`.

## forside – Forside

Over the years I have seen quite a bit of code.frontend, backend, dataplatforms, at several companies and government institions.

And one thing that really is repeated in codebases left and right, is that we as programmers in general, are using strings everywhere.

We are using strings for IDs, emails, phone numbers, home addresses, sometimes numbers are represented as strings.we are using strings for internal objects, likefor statesand we even use strings for huge unparsed objects in json, that we hope will parse nicely later.

And we do this because strings are the nicest most flexible primitive we have.

It can be anything right, so lets use it everywhere!

Many of these are very much valid and correct use cases.

But when are the not?

My name is Peter, I am a consultant in Miles, currently building new data platform for all of the norwegian police, and I am passionate about code, and the way we write code that is fast and easy to maintain.

## om-peter – Peter Bull Hove

My name is Peter, I am a consultant in Miles, currently building new data platform for the norwegian police, and I am passionate about code, and the way we write code that is fast and easy to maintain.

## trust-issues – Trust Issues

Trust issues

## trust-issues-string – Trust Issues + string

Oh a nice stringPhone numberOh yeah, really?

Trust issesI’ll admitI have themAnd it’s because of you little string.

Its say its a phone numberBut is it really ?

Oh sure, I could choose to trust that its are a phone number, but its are just a stringIt could be anything.

Anything in the whole wide world.

You could be the latin name for a rose petal, For for all that I know you could be the whole tales of moby dick, translated to swedish using a 2007 version of google translate.

Or even worse – you could be something that looks like a phone number, but just slightly off, so it will never parse.

As you can hear – I don’t really care for strings that much.

Strings are super for their purpose-representing any kind of text field, and they are definitiely my most used primitive.

But strings are dangerous due to their flexibility, and without constraints they will consume many a weekend of your time debugging and writing ad-hoc validation checks.

My goal today is for you to develop these trust issues as well, and give you the tools to avoid them.

## sources – Sources

I am basing this talk on several blog by people who have more experience me in this field, so if you want more reading about this later, check them out.

Also among them Scott Hanselman himself, who was a keynote speaker here last year.

Really energetic and super experienced and playful programmerand his blog hanselman.com – he wrote a piece about “Strongly typed languages, and that in many cases its not strongly typed at all because of all the strings, it’s stringly typed2

## sources-stringly – Stringly Typed

I am basing this talk on several blog by people who have more experience me in this field, so if you want more reading about this later, check them out.

Also among them Scott Hanselman himself, who was a keynote speaker here last year. and his blog hanselman.com – he wrote a piece about “Strongly typed languages, and that in many cases its not strongly typed at all because of all the strings, it’s stringly typed2

## bank-user – User + PhoneNumber

So imagine thisYou’re working in a bank, and you are to create a method for sending texts messages to users when they should get a notification about something.

But because of text message costs of sending across borders, your bank only want to send messages to Norwegian phone numbers. and the phone number is represented as a string where could this go wrong

## bank-smirk – Bank-historien

So imagine thisYou’re working in a bank, and you are to create a method for sending texts messages to users when they should get a notification about something.

But because of text message costs of sending across borders, your bank only want to send messages to Norwegian phone numbers. and the phone number is represented as a string where could this go wrong

## bank-sms – StartsWith +47

So you start where most programmers would .

If the phone number starts with +47 – then it is Norwegian.

Thus we send a nice SMS

## bank-email – Ellers e-post

Otherwise ..

Email.

Boom.

Nice.

And you ask yourself.

Why are you not being paid more?

You submit a PR – shwosh, you get one LGTM, and LGTM2 - straight to production, and you ship it on a Friday afternoon.

Nice, lets go get some lønningspils.

But then Monday morning, you find out, you’re not sending a lot of text messages are youAlmost every Norwegian user gets emails still? but then you look through the databasebut then you quickly realize that not every phone number in the database starts with + ..and some of them start with 0047and some of them start with + [space] 47and some of them do not have a country code at all.and some of them, when you look at them, do not look anything like a phone number at all, actually some users just entered random stuff here, since they probably did not want toWe’ll crap you thinkEither you now go in an edit all the user’s phone numbers in the database to match the desired pattern, Or you write a whole bunch of complex validations to account for every scenario that you can find in the database.

## lgtm – LGTM

Otherwise ..

Email.

Boom.

Nice.

And you ask yourself.

Why are you not being paid more?

You submit a PR – shwosh, you get one LGTM, and LGTM2 - straight to production, and you ship it on a Friday afternoon.

Nice, lets go get some lønningspils.

But then Monday morning, you find out, you’re not sending a lot of text messages are youAlmost every Norwegian user gets emails still? but then you look through the databasebut then you quickly realize that not every phone number in the database starts with + ..and some of them start with 0047and some of them start with + [space] 47and some of them do not have a country code at all.and some of them, when you look at them, do not look anything like a phone number at all, actually some users just entered random stuff here, since they probably did not want toWe’ll crap you thinkEither you now go in an edit all the user’s phone numbers in the database to match the desired pattern, Or you write a whole bunch of complex validations to account for every scenario that you can find in the database.

## lgtm2 – LGTM2

Otherwise ..

Email.

Boom.

Nice.

And you ask yourself.

Why are you not being paid more?

You submit a PR – shwosh, you get one LGTM, and LGTM2 - straight to production, and you ship it on a Friday afternoon.

Nice, lets go get some lønningspils.

But then Monday morning, your manager calls you with a screenshot of his powerbi report, and you’re not sending a lot of text messages are youAlmost every Norwegian user gets emails still?

So you start by logging .

And indeed he’s right, there are not many text messages being sendt.

So then you look through the database, peek a bit into the list of phone numbersbut then you quickly realize that not every phone number in the database starts with + ..and some of them start with 0047and some of them start with + [space] 47and some of them do not have a country code at all.and some of them, when you look at them, do not look anything like a phone number at all, actually some users just entered random stuff here, since they probably did not want toWe’ll crap you thinkEither you now go in an edit all the user’s phone numbers in the database to match the desired pattern, Or you write a whole bunch of complex validations to account for every scenario that you can find in the database.

And you pull up your sleeves and submit a huge PR with 150 lines of complex validation trying to handle every case of malformed phone number string that has come over the years of bank database.

So then after this you realize you have severe trust issues with string types.

Yes the phone numbers SHOULD have been validated when they were created, and perhaps there is some validation logic somwhere.

But it’s hard to know if all code paths actually use the validation.

And thus you end up with a database that has no consistent formatSo when using a string type you have no way of knowing if they actually were validated at the time of creating.

And in this vibe coding era, you can trust your co-developers even less to do the right thing, validating on input every time.

Thus every time you want to use a string value, your heart rate goes just sligtly up.

You assume it follows some specific format, but you are not really sure.

## melt – Mandag morgen

Otherwise ..

Email.

Boom.

Nice.

And you ask yourself.

Why are you not being paid more?

You submit a PR – shwosh, you get one LGTM, and LGTM2 - straight to production, and you ship it on a Friday afternoon.

Nice, lets go get some lønningspils.

But then Monday morning, your manager calls you with a screenshot of his powerbi report, and you’re not sending a lot of text messages are youAlmost every Norwegian user gets emails still?

So then you look through the database, peek a bit into the list of phone numbers registered for user but then you quickly realize that not every phone number in the database starts with + ..and some of them start with 0047and some of them start with 47and some of them start with + [space] 47and some of them do not have a country code at all.and some of them, when you look at them, do not look anything like a phone number at all, actually some users just entered random stuff here, since they probably did not want to giv reWe’ll crap you thinkEither you now go in an edit all the user’s phone numbers in the database to match the desired pattern, Or you write a whole bunch of complex validations to account for every scenario that you can find in the database.

The jira ticket is still not closed, and you only gave it one story point.

Well shootAnd you pull up your sleeves and submit a huge PR with 150 lines of complex validation trying to handle every case of malformed phone number string that has come over the years of bank database.

So then after this you realize you have severe trust issues with string types.

Yes the phone numbers SHOULD have been validated when they were created, and perhaps there is some validation logic somwhere.

But it’s hard to know if all code paths actually use the validation.

And thus you end up with a database that has no consistent formatThus every time you are to use a string value, your heart rate goes just sligtly up.

You assume it follows some specific format, but you are not really sure.

## pause – Pause

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

A value object is a a pattern that we can use to enforce stricter typing on this string PhoneNumber

## phonenumber-1 – PhoneNumber-record

((7min))after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-2 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-3 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-4 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-5 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-6 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-7 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## phonenumber-8 – PhoneNumber

after a couple days of digging through this codebase you decide to refactor the phone number string into a value object that more strongly typed.

You make a value object that is called a phonenumber, that has a CountryCode (ie. +47 if you are Norwegian)And a number thatAnd then we validate that on creating with regex.

So that the countycode starts with + And then we validate that the number is digits, in length 5, 20

## user-string – User med string

And now we can replace this string PhoneNumber in the User class

## user-vo – User med PhoneNumber

with a phonenumber objectAnd then when we use it – we can use it with lower shoulders, and we now know that any new phone numbers that are created will adhere to the pattern.

That leads us to the first benefit of Value Objectsthey are validated on create, not on use.

## benefit-1 – Benefit 1: validated on create

That leads us to the first benefit of Value Objectsthey are validated on create, not on use.

## ivalidator – What about IValidator

-- sidenote, the more common pattern here is that you keep the phonenumber here as a string, but you implement validation of the phone number directly in the user object.

That is fine, validation is super good.

Keep doing that.

However, that pattern ties the phone number validation only to phone numbers that are part of the user.

However, we might be creating phone numbers other places in the code, and this keeps a stronger separation of concern.

Because you might have cases later where the phone number is used outside of the user object.

## abstractions – Abstractions

((10min))Lets talk about abstractionsIn this example with the bank and the text message, our hero had to experience a lot of Cognitive load.

In order to use the phone number property as a string, he had to dig through the database, multiple parts of the codebase in order to find where this was used, and to find all the code paths that were setting or updating phone number, and find out if all code paths included validations.

As programmers, we are often great at managing and reducing cognitive load, by creating abstractions.

Abstractions are higher level interfaces, exposing only essential features to a user, but hiding complexity.

Bad abstractions...

## abstractions-bad – Bad abstractions

Bad abstractions - we hide complexity from the developers, but the complexity is still there, so the developer has to dive into the abstraction in order to understand it.

Thus it’s not an abstraction at all, rather it is nested complexity.

## abstractions-bad-2 – Nested complexity

Bad abstractions - we hide complexity from the user/the next developer, but the complexity is still there, so the developer has to dive into the abstraction in order to understand it.

Thus it’s not an abstraction at all, rather it is nested complexity.

Because here.. when you are setting What then is a good abstraction ...

## abstractions-good – Good abstractions

But what then is a good abstractiona good abstraction it tells you what it isit is never anything else than what it seems to beit can be used as one thing, and fit in your mind as one thing, instead of being a thing composed of many parts.

## abstractions-good-2 – One thing in your mind

But what then is a good abstractiona good abstraction it tells you what it isit is never anything else than what it seems to beit can be used as one thing, and fit in your mind as one thing, instead of being a thing composed of many parts.

That leads us to the second benefit of value typesThey can be great abstractions that can be used with less cognitive load.

## benefit-2 – Benefit 2: abstractions

That leads us to the second benefit of Value Objectsthey provide great abstractions

## what-are-vo – What really are Value Objects

Value objects are a pattern, based on the principles of Domain Driven Design.they are not a feature of C# - they can be implemented in any language with typing, they are not a special keyword.

They are a programming pattern. they are used to encapsulate values, primitives, or other value objects, and enforce behaviors and patterns on the values that we want.

Is a value object the same as a normal entity?

## entity-vs-vo – Entity vs Value Object

Is a value object the same as an normal entity?

Entity:Entity usually has an identity is usually mutableownsvalue objectonly valueimmutable

## payment – Payment-entity

So lets implement another value objectWe have a entity - a class PaymentIt has an Id, an amount and a currency‘Currency’ and ‘Amount’ are tied together.

The user could try to edit this from "euros" to "usd" and not edit the amount and then it would be wrong.

That is a great case for implementing a value object

## payment-record – MonetaryAmount

so then we implement a record herecalled MonetaryAmount (and it takes in a decimal Amount, and a string currency) thus we can edit the original Payment class to use the MonetaryAmount property instead of Amount and currency

## payment-vo – Payment med MonetaryAmount

and we get this Its just an ID and an amountand the C# record is readonly by default - so you cannot edit the currency, you have to replace the whole MonetaryAmount value object

## monetary-1 – Validering av MonetaryAmount

And we can make this value object MonetaryAmount better by adding validation So now we want to add validation, so that we can avoid any trust issues later with our object.

We add that amount must be greater than zero We add that currency must be one of the supported currencies codesAnd if that is an older code, but still checks out, then create the MonetaryAmount.

## monetary-2 – MonetaryAmount

So now we want to add validation, so that we can avoid any trust issues later with our object.

We add that amount must be greater than zero We add that currency must be one of the supported currencies codesAnd if that is an older code, but still checks out, then create the MonetaryAmount.

## monetary-3 – MonetaryAmount

So now we want to add validation, so that we can avoid any trust issues later with our object.

We add that amount must be greater than zero We add that currency must be one of the supported currencies codesAnd if that is an older code, but still checks out, then create the MonetaryAmount.

## monetary-4 – MonetaryAmount

So now we want to add validation, so that we can avoid any trust issues later with our object.

We add that amount must be greater than zero We add that currency must be one of the supported currencies codesAnd if that is an older code, but still checks out, then create the MonetaryAmount.

## monetary-5 – MonetaryAmount

So now we want to add validation, so that we can avoid any trust issues later with our object.

We add that amount must be greater than zero We add that currency must be one of the supported currencies codes

## benefit-3 – Benefit 3: bind primitives



## how-to-implement – How to implement



## signature – PhoneNumber-signatur

So – here we have the signature for a phoneNumber what should be the keyword here? if you have been paying attention you have seen it in the code examples

## options-a – A) Class

So – here we have the signature for a phoneNumber what should be the keyword here? if you have been paying attention you have seen it in the code examples

## options-b – B) Struct



## options-c – C) Record class

So – here we have the signature for a phoneNumber what should be the keyword here? if you have been paying attention you have seen it in the code examples

## options-d – D) Record struct

So – here we have the signature for a phoneNumber what should be the keyword here? if you have been paying attention you have seen it in the code examples

## options-answer – Record class

90% of the time you would want to use ‘record’ to serialize to json, or map to ORM.more simple and safecan easier add more properties laterrecord struct is finesmaller object in memory < 32 bytes, so if you are using strings, probably use record class, and not records structvalue typecan never be nullcan be costly if largerecord Struct is a value type, optimized for some use cases, but can have pitfalls, too much memory allocations.

You should know what you are doing, and not just vibe code structs everywhere.

Therefore i and most of the documentation suggests to use plain record most of the time for yourwhy record, why not ‘just’ class?equality by value, ‘class’ is a reference type, meaning on default equality you compare not on the values of the properties in the class, but the reference id of the class itself, meaning that two different instances will never be equal, no matter if the content of them are the same).you get a lot of boilerplate for free (ToString(),primitive constructor gets get; init; by default, so it is natively readonly by default.classes are to be used for complex entities, that have an identifier, and are persisted over a long time.

## apis-orms – APIs and ORMs

Our applications do not exists alone, they interact with APIs and Databases using object relational mappings such as Entity Framework.

## ef – Entity Framework

How do we map this

## ef-phone – EF + PhoneNumber

Assume that we now have our phonenumber value object.

And we want to keep this in the database unser one column “Phonenumber” that is still one string.

But in our code we want to model it and split it.

## ef-map-1 – EF-mapping



## ef-map-2 – EF-mapping



## ef-map-3 – EF-mapping



## ef-map-4 – EF-mapping



## ef-map-5 – EF-mapping



## ef-map-6 – EF-mapping



## ef-owned – Owned types



## api-serialization – API Serialization



## api-1 – JSON-binding

so there is some bolierplate here with using nested types instead of primitives.

But it is not more complex – you just do the parsing and validation at the time of entry, at the boundaries, meaning if it is inside you applicaition, and became a phone number, then you can trust it.

And if you are using Entity Framework - we must map these nested types to a column in your database, so that the ModelBuilder can understand your value type.

Using Owned types, multiple columns.

## api-2 – JSON-binding

so there is some bolierplate here with using nested types instead of primitives.

But it is not more complex – you just do the parsing and validation at the time of entry, at the boundaries, meaning if it is inside you applicaition, and became a phone number, then you can trust it.

And if you are using Entity Framework - we must map these nested types to a column in your database, so that the ModelBuilder can understand your value type.

Using Owned types, multiple columns.

## api-3 – JSON-binding

so there is some bolierplate here with using nested types instead of primitives.

You just do the parsing and validation at the time of entry, at the boundaries, meaning if it is inside you applicaition, and became a phone number, then you can trust it.

And if you are using Entity Framework - we must map these nested types to a column in your database, so that the ModelBuilder can understand your value type.

Using Owned types, multiple columns.

## benefit-4 – Benefit 4: parse in one place



## pitfalls-1 – Overusage

Overusage- not everything has to be a value object.

Since there is some overhead in serialization, and database embeddings.

Try therefore to use them for the which you think are usefulRemember to make them immutable - value objects should not be editableTeam understanding - don’t just refactor everything, do it in small steps, and make sure your team is on board with the refact0rs, so that the codebase stays consistent.

## pitfalls-2 – Mutability

Overusage- not everything has to be a value object.

Since there is some overhead in serialization, and database embeddings.

Try therefore to use them for the which areRemember to make them immutable - value objects should not be editableTeam understanding - don’t just refactor everything, do it in small steps, and make sure your team is on board with the refact0rs, so that the codebase stays consistent.

## pitfalls-3 – Serialization / ORM

Overusage- not everything has to be a value object.

Since there is some overhead in serialization, and database embeddings.

Try therefore to use them for the which areRemember to make them immutable - value objects should not be editableTeam understanding - don’t just refactor everything, do it in small steps, and make sure your team is on board with the refact0rs, so that the codebase stays consistent.

## pitfalls-4 – Team and coding

Overusage- not everything has to be a value object.

Since there is some overhead in serialization, and database embeddings.

Try therefore to use them for the which areRemember to make them immutable - value objects should not be editableTeam understanding - don’t just refactor everything, do it in small steps, and make sure your team is on board with the refact0rs, so that the codebase stays consistent.

## go-forth – Go Forth and code on

So, the next time you find yourself writing yet another regex check for a string, take a step back and ask: Does this really need to be a string?

Or can I give this concept a proper structure as a Value Object?

Thank you for listening, and happy coding guys!

