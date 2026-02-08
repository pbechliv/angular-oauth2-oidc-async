# Configure custom OAuthStorage

This library uses `sessionStorage` as the default storage provider. You can customize this by using `localStorage` or your own storage solution.

## Using localStorage
If  you want to use `localStorage` instead of `sessionStorage`, you can add a provider to your AppModule. This works as follows:

```TypeScript
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
// etc.

// We need a factory, since localStorage is not available during AOT build time.
export function storageFactory() : OAuthStorage {
  return localStorage
}
 
@NgModule({
  imports: [ 
    // etc.
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    // etc.
  ],
  bootstrap: [
    AppComponent 
  ],
  providers: [
    { provide: OAuthStorage, useFactory: storageFactory }
  ]
})
export class AppModule {
}
```

## Custom storage solution

If you want to use a custom storage solution, you can extend the `OAuthStorage` class. Documentation can be found [here](../classes/OAuthStorage.html#info). Then add it as a provider, just like in the `localStorage` example above.

`OAuthStorage` supports synchronous reads and synchronous or asynchronous writes:

- `getItem(key): string | null`
- `setItem(key, value): void | Promise<void>`
- `removeItem(key): void | Promise<void>`
- `init?(): Promise<void>` (optional startup hook for async backends)

Implement `init()` when your storage needs to hydrate an in-memory cache before `getItem` is used (for example, loading data from IndexedDB).
