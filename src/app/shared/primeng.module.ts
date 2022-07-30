import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
const MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  DividerModule,
  ScrollPanelModule,
  MenuModule,
  MenubarModule,
  TieredMenuModule,
  SidebarModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  exports: [MODULES],
})
export class PrimengModule {}
