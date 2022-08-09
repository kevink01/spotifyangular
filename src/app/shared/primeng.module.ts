import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from 'primeng/skeleton';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

const MODULES = [
  AvatarModule,
  ButtonModule,
  CardModule,
  ChipModule,
  DataViewModule,
  DialogModule,
  DividerModule,
  DropdownModule,
  DynamicDialogModule,
  FieldsetModule,
  FileUploadModule,
  ImageModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MenubarModule,
  MenuModule,
  MultiSelectModule,
  ProgressSpinnerModule,
  ScrollPanelModule,
  SkeletonModule,
  StepsModule,
  TableModule,
  TabViewModule,
  TieredMenuModule,
  ToastModule,
  ToolbarModule,
  TooltipModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  providers: [DialogService, MessageService],
  exports: [MODULES],
})
export class PrimengModule {}
