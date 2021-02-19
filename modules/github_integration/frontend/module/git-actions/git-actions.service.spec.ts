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

/*jshint expr: true*/

import { GitActionsService } from './git-actions.service';
import { WorkPackageResource } from 'core-app/modules/hal/resources/work-package-resource';
import { PathHelperService } from 'core-app/modules/common/path-helper/path-helper.service';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('GitActionsService', function() {
  let service:GitActionsService;

  const createWorkPackage = (overrides = {}) => {
    const defaults = {
      id: '42',
      subject: 'Find the question',
      description: {
        raw: 'I recently found the answer is 42. We need to compute the correct question.'
      },
      type: { name: 'User Story' },
      pathHelper: new PathHelperService()
    };
    const workPackage = { ...defaults, ...overrides };
    return(workPackage as WorkPackageResource);
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        GitActionsService
      ],
      declarations: [
        GitActionsService
      ]
    }).compileComponents()
      .then(() => {
        service = TestBed.inject(GitActionsService);
      });
  }));

  beforeEach(() => {
    service = new GitActionsService();
  });

  it('it produces a branch name, commit message, and a git command', () => {
    const wp = createWorkPackage();
    expect(service.branchName(wp)).toEqual('this should fail');
    expect(service.commitMessage(wp)).toEqual('this should fail');
    expect(service.gitCommand(wp)).toEqual('this should fail');
  });
});
