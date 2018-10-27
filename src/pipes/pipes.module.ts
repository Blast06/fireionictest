import { NgModule } from '@angular/core';
import { PlaceHolderPipe } from './place-holder/place-holder';
import { SanitizerPipe } from './sanitizer/sanitizer';
@NgModule({
	declarations: [PlaceHolderPipe,
    SanitizerPipe],
	imports: [],
	exports: [PlaceHolderPipe,
    SanitizerPipe]
})
export class PipesModule {}
