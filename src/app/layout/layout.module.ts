import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatToolbarModule, MatButtonModule, MatTooltipModule, MatMenuModule } from '@angular/material';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,

        NgProgressModule.forRoot(),
        NgProgressHttpModule,
    ],
    declarations: [HeaderComponent, FooterComponent],
    exports: [HeaderComponent, FooterComponent],
    providers: []
})
export class LayoutModule { }
