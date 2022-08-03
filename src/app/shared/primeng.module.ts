import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from 'primeng/skeleton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

const MODULES = [
  ButtonModule,
  CardModule,
  DataViewModule,
  DialogModule,
  DividerModule,
  DropdownModule,
  DynamicDialogModule,
  InputTextModule,
  MenubarModule,
  MenuModule,
  ProgressSpinnerModule,
  ScrollPanelModule,
  SkeletonModule,
  StepsModule,
  TableModule,
  TabViewModule,
  TieredMenuModule,
  ToastModule,
  ToolbarModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  providers: [DialogService],
  exports: [MODULES],
})
export class PrimengModule {}
