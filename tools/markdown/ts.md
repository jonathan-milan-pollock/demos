# ts

## Recommended Books

## Recommended Reading

- [Practical Guide to Fp-ts](https://rlee.dev/writing/practical-guide-to-fp-ts-part-1)

## value can be returned immediately?

- use a generator or async generator, pull based
- IterableIterator

## value cannot be returned immediately a promise or event emitted

- use an observable, push based
- don't drain resources continuing to pull
- also used with web hooks

promise
: from

event
: scheduled

## object relationships

is-a
: inheritance

has-a
: composition

includes-a
: mixins