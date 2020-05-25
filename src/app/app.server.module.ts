import { NgModule } from '@angular/core';
import { ServerModule, BEFORE_APP_SERIALIZED } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { hydrateDocument } from 'stencil-repro/hydrate';
import { DOCUMENT } from '@angular/common';

export function hydrateFTBComponents(doc) {
  return () => {

    return hydrateDocument(doc).then((result) => {
      console.log('hydrating app');

      console.log(result);

      return result.html;
    });
  };
}


@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],  
  providers: [
    {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: hydrateFTBComponents,
      multi: true,
      deps: [DOCUMENT],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
