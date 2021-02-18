//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) 2012-2021 the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See docs/COPYRIGHT.rdoc for more details.
//++

import {OpContextMenuItem} from 'core-components/op-context-menu/op-context-menu.types';
import {StateService} from '@uirouter/core';
import {OPContextMenuService} from "core-components/op-context-menu/op-context-menu.service";
import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {LinkHandling} from "core-app/modules/common/link-handling/link-handling";
import {OpContextMenuTrigger} from "core-components/op-context-menu/handlers/op-context-menu-trigger.directive";
import {Highlighting} from 'core-app/components/wp-fast-table/builders/highlighting/highlighting.functions';
import {BrowserDetector} from "core-app/modules/common/browser/browser-detector.service";
import { WorkPackageResource } from 'core-app/modules/hal/resources/work-package-resource';
import {I18nService} from "core-app/modules/common/i18n/i18n.service";
import { GitActionsMenuComponent } from './git-actions-menu.component';

@Directive({
  selector: '[gitActionsCopyDropdown]'
})
export class GitActionsMenuDirective extends OpContextMenuTrigger {
  @Input('gitActionsCopyDropdown-workPackage') public workPackage:WorkPackageResource;

  constructor(readonly elementRef:ElementRef,
              readonly opContextMenu:OPContextMenuService,
              readonly browserDetector:BrowserDetector,
              readonly $state:StateService,
              readonly I18n:I18nService) {
    super(elementRef, opContextMenu);
  }

  protected open(evt:JQuery.TriggeredEvent) {
    this.opContextMenu.show(this, evt, GitActionsMenuComponent);
  }

  public get locals():{ showAnchorRight?:boolean, contextMenuId?:string, items:OpContextMenuItem[], workPackage:WorkPackageResource } {
    return {
      workPackage: this.workPackage,
      contextMenuId: 'github-integration-git-actions-menu',
      items: []
    };
  }
}

