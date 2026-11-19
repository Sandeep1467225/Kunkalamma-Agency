import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('agency-language');
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('should create the app', () => {
    expect(TestBed.createComponent(AppComponent).componentInstance).toBeTruthy();
  });

  it('should render the aqua feed homepage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Shri Kunkalamma Agency');
  });

  afterEach(() => {
    localStorage.removeItem('agency-language');
    document.documentElement.lang = 'en';
  });

  it('should translate the homepage, navigation and footer into Telugu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.setLanguage('te');
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('శ్రీ కుంకలమ్మ ఏజెన్సీ');
    expect(page.querySelector('nav')?.textContent).toContain('మా గురించి');
    expect(page.querySelector('footer')?.textContent).toContain('మా సేవలు');
    expect(document.documentElement.lang).toBe('te');
  });

  it('should remember Telugu and switch back to English', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.setLanguage('te');
    const reloaded = TestBed.createComponent(AppComponent);
    expect(reloaded.componentInstance.language).toBe('te');
    reloaded.componentInstance.setLanguage('en');
    reloaded.detectChanges();
    expect(reloaded.nativeElement.querySelector('h1').textContent).toContain('Shri Kunkalamma Agency');
    expect(localStorage.getItem('agency-language')).toBe('en');
  });

  it('should use the selected feed artwork', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.selectFeed('Mash Feed');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.company-logo').getAttribute('src')).toContain('prime-company.jpeg');
    fixture.componentInstance.openCompany();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.supplied-card').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.supplied-image-button img').getAttribute('src')).toContain('prime-mash-feed.jpg');
  });

  it('should show the company before its feeds and product details', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.openCatalogue();
    fixture.detectChanges();
    expect(app.page).toBe('companies');
    expect(fixture.nativeElement.querySelector('.company-card')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.company-logo').getAttribute('src')).toBe('assets/prime-company.jpeg');
    expect(fixture.nativeElement.querySelector('.company-preview')).toBeNull();
    expect(fixture.nativeElement.querySelector('.supplied-card')).toBeNull();
    (fixture.nativeElement.querySelector('.company-card') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(app.page).toBe('products');
    expect(fixture.nativeElement.querySelectorAll('.supplied-card').length).toBe(3);
    app.selectProduct('prime-mash');
    expect(app.page).toBe('product');
    app.openCompany();
    expect(app.page).toBe('products');
  });

  it('should show only supplied feeds and confirmed nutrition', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance;
    expect(app.catalogue.products.length).toBe(3);
    app.selectProduct('polyprime-polyculture');
    expect(app.selectedProduct.protein).toBe('Min. 32%');
    expect(app.selectedProduct.fat).toBe('Min. 4%');
    app.selectProduct('prime-mash');
    expect(app.selectedProduct.protein).toBeNull();
    expect(app.selectedProduct.packSize).toBe('50 kg');
    app.openPrawnCatalogue();
    app.openCompany();
    expect(app.catalogueProducts.map(item => item.id)).toEqual(['polyprime-polyculture']);
  });

  it('should open the selected product with its enquiry link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.selectProduct('polyprime-polyculture');
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('PolyPrime Polyculture Feed');
    expect(page.querySelector('.product-detail a')?.getAttribute('href')).toContain('PolyPrime%20Polyculture%20Feed');
  });
});
