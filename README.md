# RxJS-SubscribeTap operator

SubscribeTap is a RxJS' operator that will execute defined function for you when the source gets subscribed.

## Instalation

SubscribeTap is available on npm. To install type:

```
npm install -S rxjs-subscribetap
```

## Usage

Firstly you need to import operator you have just installed:

```typescript
import { subscribeTap } from 'rxjs-subscribetap';
```

Then use it on any Observable!

```typescript
of(1, 2, 3)
  .pipe(
    subscribeTap(() => console.log('callback!')),
  )
  .subscribe((value: number) => console.log(value));
```

## Multiple subscribeTaps

If you intend to use multiple subscribeTaps you need to know, that operator "wraps" your original Observable. This wrapper creates new Observable that will execute specified callback and feed items from original Observable to the new one.

So if you use two subscribeTaps one after another you will end up with "wrapper 1" over "wrapper 2". If you subscribe to such a result callback from "wrapper 2" will be executed first.

```typescript
of(1, 2, 3)
  .pipe(
    subscribeTap(() => console.log('callback 1')), // executed second
    subscribeTap(() => console.log('callback 2')), // executed first
  )
  .subscribe((value: number) => console.log(value));
```

To avoid any unexpected behavior it is advised to use only single subscribeTap and as a first operator in the pipeline:

```typescript
of(1, 2, 3)
  .pipe(
    subscribeTap(() => {
      console.log('callback 1'); // executed first
      console.log('callback 2'); // executed second
    }), 
  )
  .subscribe((value: number) => console.log(value));
```

## License

Dual licensed under ["The Unlicense"](LICENSE.md) and ["MIT"](LICENSE.MIT.md) .

"The Unlicense" is recommended for most cases, because it let's you use operator with no restrictions under no conditions. If "The Unlicense" is for some reason not suitable for you, take it under MIT license. 

In any case, feel free to use this piece of software for any purposes (including commercial use).
