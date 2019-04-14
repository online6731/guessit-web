import { TestBed, inject } from '@angular/core/testing';

import { ShopService } from './_services/shop.service';

describe('ShopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopService]
    });
  });

  it('should be created', inject([ShopService], (service: ShopService) => {
    expect(service).toBeTruthy();
  }));
});
