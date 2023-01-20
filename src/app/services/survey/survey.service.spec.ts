/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { SurveyService } from './survey.service.ts';

describe('Service: Survey', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyService]
    });
  });

  it('should ...', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
