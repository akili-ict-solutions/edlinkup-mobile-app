import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ServiceInfomationComponent } from './service-infomation/service-infomation';
import { CustomComponent } from './custom/custom';
@NgModule({
	declarations: [ServiceInfomationComponent,
    CustomComponent],
	imports: [IonicModule],
	exports: [ServiceInfomationComponent,
    CustomComponent]
})
export class ComponentsModule {}
