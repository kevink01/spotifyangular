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
import { ConfirmationService, MessageService } from 'primeng/api';
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

import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule, RadioControlRegistry } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { ChipsModule } from 'primeng/chips';
import {
  CheckboxControlValueAccessor,
  RadioControlValueAccessor,
  SelectControlValueAccessor,
  SelectMultipleControlValueAccessor,
} from '@angular/forms';
const extras = [
  AutoCompleteModule,
  CalendarModule,
  InputNumberModule,
  SliderModule,
  RatingModule,
  RadioButtonModule,
  CheckboxModule,
  ListboxModule,
  ToggleButtonModule,
  SelectButtonModule,
  ProgressBarModule,
  PaginatorModule,
  AccordionModule,
  PanelModule,
  OverlayPanelModule,
  ConfirmPopupModule,
  ConfirmDialogModule,
  ContextMenuModule,
  TimelineModule,
  MessageModule,
  ChipsModule,
];

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
  imports: [CommonModule, MODULES, extras],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    SelectMultipleControlValueAccessor,
    CheckboxControlValueAccessor,
    SelectControlValueAccessor,
  ],
  exports: [MODULES, extras],
})
export class PrimengModule {}
