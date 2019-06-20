import { Observable, OperatorFunction, merge, of } from 'rxjs';
import { skip, tap } from 'rxjs/operators';

/**
 * Returns an source observable, but will execute a specified callback on subscription.
 * @param callback Function to be called
 * @returns A clone of observable received, but with callback execution added.
 */
export function subscribeTap<T>(callback: () => void): OperatorFunction<T, T> {

  return (source: Observable<T>): Observable<T> =>
    merge(of((null as unknown) as T)
      .pipe(
        tap(callback),
        skip(1),
      ), source);
}
