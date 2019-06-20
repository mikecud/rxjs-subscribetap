import { empty, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { subscribeTap } from '../subscribe-tap';

describe('subscribeTap operator', () => {
  describe('timing', () => {

    test('should execute callback on subscription', (done: jest.DoneCallback) => {
      let started = false;

      of(1, 2, 3)
        .pipe(
          subscribeTap(() => started = true),
        )
        .subscribe(() => {
          expect(started).toBeTruthy();
          done();
        });
    });

    test('should not execute callback without subscription', () => {
      let started = false;

      of(1, 2, 3)
        .pipe(
          subscribeTap(() => started = true),
        );

      expect(started).toBeFalsy();
    });

    test('should execute callback before subscription', (done: jest.DoneCallback) => {
      let subscribed = false;

      of(1, 2, 3)
        .pipe(
          subscribeTap(() => {
            expect(subscribed).toBeFalsy();
            done();
          }),
        )
        .subscribe(() => subscribed = true);
    });

    test('should execute callback before error', (done: jest.DoneCallback) => {
      let thrown = false;

      of(1, 2, 3)
        .pipe(
          map((x) => {
            if (x === 3) {
              throw x;
            }

            return x;
          }),
          subscribeTap(() => {
            expect(thrown).toBeFalsy();
            done();
          }),
        )
        .subscribe(null, () => {
          thrown = true;
        });
    });

    test('should execute callback before completion', (done: jest.DoneCallback) => {
      let completed = false;

      of(1, 2, 3)
        .pipe(
          subscribeTap(() => {
            expect(completed).toBeFalsy();
            done();
          }),
        )
        .subscribe(null, null, () => completed = true);
    });

    test('should execute callback before finalize', (done: jest.DoneCallback) => {
      let finalized = false;

      of(1, 2, 3)
        .pipe(
          finalize(() => finalized = true),
          subscribeTap(() => {
            expect(finalized).toBeFalsy();
            done();
          }),
        )
        .subscribe();
    });
  });

  describe('executions count', () => {

    test('should call subscribeTap even if observable is empty', (done: jest.DoneCallback) => {
      let started = false;

      empty()
        .pipe(
          subscribeTap(() => started = true),
        )
        .subscribe(null, null, () => {
          expect(started).toBeTruthy();
          done();
        });
    });

    test('should execute callback only once even when observable emits multiple items', (done: jest.DoneCallback) => {
      let itemCount = 0;
      let callbackCount = 0;

      of(1, 2, 3)
        .pipe(
          subscribeTap(() => callbackCount += 1),
        )
        .subscribe(() => {
          itemCount += 1;

          if (itemCount === 3) {
            expect(callbackCount).toBe(1);
            done();
          }
        });
    });

  });

});
