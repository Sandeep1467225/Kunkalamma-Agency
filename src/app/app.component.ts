import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TELUGU } from './translations';
import { FEED_CATALOGUE } from './feed-catalogue';

@Component({ selector: 'app-root', imports: [CommonModule, FormsModule], templateUrl: './app.component.html', styleUrl: './app.component.sass' })
export class AppComponent implements OnInit, OnDestroy {
  @HostListener('contextmenu', ['$event'])
  @HostListener('dragstart', ['$event'])
  protectImages(event: Event) {
    const target = event.target;
    if (target instanceof HTMLImageElement || (target instanceof Element && target.classList.contains('artwork'))) event.preventDefault();
  }
  language: 'en' | 'te' = 'en';
  constructor() {
    try { this.language = localStorage.getItem('agency-language') === 'te' ? 'te' : 'en'; } catch { /* Storage may be unavailable in private browsing. */ }
    this.setLanguage(this.language);
  }
  t(text: string): string {
    return this.language === 'te' ? TELUGU[text.replace(/\s+/g, ' ').trim()] || text : text;
  }
  setLanguage(value: string) {
    this.language = value === 'te' ? 'te' : 'en';
    document.documentElement.lang = this.language;
    document.title = this.language === 'te' ? 'శ్రీ కుంకలమ్మ ఏజెన్సీ | ఆక్వా మేత సరఫరా' : 'Shri Kunkalamma Agency | Aqua Feed Supply';
    try { localStorage.setItem('agency-language', this.language); } catch { /* Switching still works without persistence. */ }
  }
  get productEnquiry() { return this.productEnquiryFor(this.selectedProduct); }
  productEnquiryFor(item: typeof this.selectedProduct) {
    return [
      this.language === 'te' ? 'నమస్కారం, ఈ ఉత్పత్తి గురించి తెలుసుకోవాలనుకుంటున్నాను:' : 'Hello, I would like to know more about this product:',
      '',
      this.t(item.name),
      `${this.t('Type:')} ${this.t(item.feedType)}`,
      `${this.t('Protein:')} ${this.t(item.protein || 'Contact us')}`,
      `${this.t('Fat:')} ${this.t(item.fat || 'Contact us')}`,
      `${this.t('Pack Size:')} ${this.t(item.packSize || 'Contact us')}`
    ].join('\n');
  }
  get breadcrumb() {
    if (this.page === 'product') return [this.catalogue.company.name, this.t(this.feed), this.t(this.product)].join(' › ');
    if (this.page === 'companies') return this.t('Available Company');
    if (this.page === 'products') return this.catalogue.company.name;
    return this.t(this.page === 'feed' ? 'Fish Feed' : this.page === 'prawn' ? 'Prawn Feed' : this.page === 'contact' ? 'Contact Us' : 'About Us');
  }
  title = 'agency';
  page = 'home'; menu = false; feed = 'Floating Feed';
  legalDialog: 'privacy' | 'terms' | null = null;
  @ViewChild('legalModal') legalModal!: ElementRef<HTMLDialogElement>;
  openLegal(section: 'privacy' | 'terms') { this.legalDialog = section; this.legalModal.nativeElement.showModal(); }
  private welcomePlayed = false;
  private welcomeAudio?: HTMLAudioElement;
  private readonly welcomeOnInteraction = () => this.playWelcome();
  ngOnInit() {
    this.welcomeAudio = document.getElementById('welcome-audio') as HTMLAudioElement | undefined;
    if (!this.welcomeAudio) return;
    this.welcomeAudio.playbackRate = 1.2;
    this.welcomePlayed = !this.welcomeAudio.paused || this.welcomeAudio.currentTime > 0;
    this.playWelcome();
    document.addEventListener('pointerdown', this.welcomeOnInteraction, { once: true });
    document.addEventListener('keydown', this.welcomeOnInteraction, { once: true });
  }
  ngOnDestroy() {
    document.removeEventListener('pointerdown', this.welcomeOnInteraction);
    document.removeEventListener('keydown', this.welcomeOnInteraction);
    this.welcomeAudio?.pause();
  }
  playWelcome(replay = false) {
    if ((!replay && this.welcomePlayed) || !this.welcomeAudio) return;
    if (replay) this.welcomeAudio.currentTime = 0;
    this.welcomeAudio.play().then(() => { this.welcomePlayed = true; }).catch(() => { /* Playback can require a user gesture. */ });
  }
  readonly catalogue = FEED_CATALOGUE;
  selectedProductId = this.catalogue.products[0].id;
  feedFilter: string | null = null;
  audience: 'Fish' | 'Prawn' | null = null;
  get selectedProduct() { return this.catalogue.products.find(item => item.id === this.selectedProductId) || this.catalogue.products[0]; }
  get product() { return this.selectedProduct.name; }
  get brand() { return this.selectedProduct.brand; }
  get catalogueProducts() { return this.catalogue.products.filter(item => (!this.audience || item.suitableFor.includes(this.audience)) && (!this.feedFilter || item.feedType === this.feedFilter)); }
  get catalogueTitle() { return this.audience === 'Prawn' ? 'Prawn Feed' : this.feedFilter || 'Our Feed Products'; }
  get otherProducts() { return this.catalogue.products.filter(item => item.id !== this.selectedProductId); }
  name = ''; message = ''; sent = false;
  feeds = [
    {name:'Floating Feed', text:'Float on water surface and easy for fish to eat.', image:'floating-feed.jpg'},
    {name:'Poly Feed', text:'Sinking feed with high nutritional value.', image:'poly-feed.jpg'},
    {name:'Mash Feed', text:'Fine feed for young fish and better growth.', image:'mash-feed.jpg'}
  ];
  get companyHeaderImage() { return this.audience === 'Prawn' ? 'prawn-pond-scene.png' : this.feedFilter ? this.selectedFeedImage : 'fish-pond-scene.png'; }
  get companyFeedDescription() { return this.audience === 'Prawn' ? 'Specialized feed for strong health and better performance of prawns.' : this.feeds.find(item => item.name === this.feedFilter)?.text || 'High quality feed for healthy growth, better nutrition and excellent feed conversion.'; }
  get selectedFeedImage() { return this.feeds.find(item => item.name === this.feed)?.image || this.feeds[0].image; }
  asset(file: string) { return {'background-image':`url(assets/${file})`, 'background-size':'cover', 'background-position':'center'}; }
  go(page: string) { this.page = page; this.menu = false; window.scrollTo({top:0,behavior:'smooth'}); }
  openCatalogue() { this.feedFilter = null; this.audience = 'Fish'; this.go('companies'); }
  openPrawnCatalogue() { this.feedFilter = null; this.audience = 'Prawn'; this.go('companies'); }
  openCompany() { this.go('products'); }
  showAllCompanyFeeds() { this.feedFilter = null; this.audience = null; this.go('products'); }
  selectFeed(feed: string) { this.feed = feed; this.feedFilter = feed; this.audience = null; this.go('companies'); }
  selectProduct(id: string) {
    const product = this.catalogue.products.find(item => item.id === id);
    if (!product) return;
    this.selectedProductId = id; this.feed = product.feedType;
    this.go('product');
  }
  whatsapp(message = this.language === 'te' ? 'నమస్కారం, ఆక్వా మేత గురించి తెలుసుకోవాలనుకుంటున్నాను.' : 'Hello, I would like to enquire about aqua feed.') { return 'whatsapp://send?phone=917382932462&text=' + encodeURIComponent(message); }
  send() { if(this.name.trim() && this.message.trim()) { window.location.href = this.whatsapp(this.language === 'te' ? `నమస్కారం, నా పేరు ${this.name}. ${this.message}` : `Hello, I am ${this.name}. ${this.message}`); this.sent = true; } }
}
