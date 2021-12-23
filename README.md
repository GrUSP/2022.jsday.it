# Hexo/Bulma Grusp Themes

<!--ToC-->
* [Installazione](#installazione)
  * [Requirements](#requirements)
  * [Setup](#setup)
  * [Componenti aggiuntivi](#componenti-aggiuntivi)
* [Informazioni generali](#informazioni-generali)
  * [Generare il sito](#generare-il-sito)
* [Configurazione](#configurazione)
  * [Importante](#importante)
  * [GitHub Pages](#github-pages)
  * [Configurazione generale del sito](#configurazione-generale-del-sito)
  * [Tema](#tema)
  * [Configurazione generale del tema](#configurazione-generale-del-tema)
* [Conferenze online](#conferenze-online)
* [Contenuti](#contenuti)
  * [Info base sulla conferenza](#info-base-sulla-conferenza)
  * [Home page e componenti](#home-page-e-componenti)
  * [Footer](#footer)
  * [Welcome](#welcome)
  * [Welcome/about](#welcomeabout)
  * [Welcome/coc](#welcomecoc)
  * [Welcome/scholarships](#welcomescholarships)
  * [Welcome/where](#welcomewhere)
  * [Welcome/cfp](#welcomecfp)
  * [Talks](#talks)
  * [Schedule](#schedule)
    * [La logica](#la-logica)
  * [Workshop](#workshop)
  * [Sponsor](#sponsor)
    * [Pagina "sponsor"](#pagina-sponsor)
    * [Componente "sponsors"](#componente-sponsors)
<!--/ToC-->

## Installazione

### Pre-requirements

I prerequisiti all'installazione di Hexo sono:

* node.js 12.18.3 (LTS)
  * npm
* git

La [documentazione di Hexo](https://hexo.io/docs/) include le istruzioni per installare entrambi (Windows, Mac, Linux) e naturalmente le istruzioni per installare Hexo stesso.

### Setup

`npm install`

## Componenti aggiuntivi

Oltre al setup standard di Hexo sono stati aggiunti i seguenti plugins:

* **Bulma** CSS framework
* hexo-filter-responsive-images
* hexo-render-pug
* hexo-renderer-markdown-it-plus
* hexo-renderer-sass
* markdown-it
* node-sass

Essi vengono installati automaticamente dal setup come dipendenze.

## Informazioni generali

Il file di configurazione del sito si trova nella root directory del repo; i file di configurazione dei temi nelle rispettive directory (in `themes/[directory del tema]/`).

Gli asset comuni (icone, immagini di sfondo delle testate, etc.) si trovano nei singoli temi.

I contenuti (testi) invece si trovano in `/source/_data/`; gli asset specifici della singola conferenza (le foto degli speaker, i loghi dei partner, etc) si trovano in `/source/_data/img/`. Per i dettagli vedere [Contenuti](#contenuti).

### Generare il sito

Per generare il sito in locale:

`npm run generate`

Il comando svuota la directory `/public`, genera tutti i contenuti e li pubblica appunto in `/public`.

Per testare in locale si può usare la funzionalità di Hexo che avvia un miniserver:

`npm run server`

La variante `watch` serve a lavorare sui contenuti senza dover riavviare continuamente il "server" di Hexo:

`npm run watch`

Il server ricarica dinamicamente i contenuti ogni volta che un file viene salvato. In questo modo si può lavorare sulla propria macchina con un'anteprima in tempo reale delle modifiche che si fanno. È necessario riavviare il server / rigenerare il sito solo se si fanno modifiche alla configurazione del tema o alla struttura dei template.

## Configurazione

### Importante

Ci deve essere **almeno un post**, anche se vuoto, in `/source/_posts`, altrimenti **non viene generato l'`index` del sito**

### GitHub Pages

#### Build and deploy

Il repository contiene lo script per la generazione del sito: `/.github/workflows/deploy.yml` che contiene le impostazioni per generare il sito e pubblicarlo su GitHub Pages.

La "action" specificata nello script, che scatta quando si fa `push` su `master`, genera le pagine e gli assets e li pubblica in `gh-pages`.

**Attenzione**: il file `CNAME` che specifica il dominio custom per GitHubPages deve essere incluso in `/source`, in modo che Hexo lo includa fra i file generati durante il deploy. Ovvero, in questo modo il file verrà copiato nel root directory di destinazione, e GitHub Pages potrà fare il redirect usando il dominio specificato.

#### 404 page

Quando si lavora in locale, la  pagina 404 / Not Found viene generata, ma non utilizzata. Per utilizzarla sul server, seguire le [indicazioni fornite da GitHub](https://help.github.com/en/github/working-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site).

È sufficiente specificare `404.html` (la pagina viene generata nel root directory del sito).

### Configurazione generale del sito

La configurazione generale si trova nel file `_config.yml` nella root directory del repo.

Qui si definiscono:

* il **tema** (cfr. capitolo successivo "Tema")
* i dati per schema.org e OpenGraph
* la visualizzazione (o no) della *breadcrumbs* nelle pagine interne
* l'URL del sito
* i formati delle date
* i parametri di configurazione standard di Hexo (separati da un commento "############# standard config: do not change")

#### OpenGraph

Tra i dati "interessanti" ci sono `title`, `description`, etc.; vengono usati per generare i microdata (json-ld) nelle varie pagine. vedere anche la [documentazione di Hexo](https://hexo.io/docs/configuration.html)

```
# Site / OG
type: website
title: "ruby day 2020"
description: "Ruby Day 2020, Verona, Italy"
# separate keywords by comma, no spaces
keywords: conference,software conference,ruby,ruby on rails
author: GrUSP
language: en
timezone: 'Europe/Rome'
# si può sostituire con il logo della conferenza (`img/conference-logo.png`)
image: 'img/grusp-logo-full.png'
open_graph:
  # si può sostituire con il logo della conferenza (`img/conference-logo.png`)
  image: 'img/grusp-logo-full.png'
```

C'è anche la sezione dove inserire gli account social:

```
twitter:
  twitter_id: rubydayIT
fb:
  fb_id: RubyDayIT
```

**NB** c'è una issue di Hexo per cui

```
open_graph:
  image: 'img/grusp-logo-full.png'
```

a volte non viene interpretato correttamente, open_graph.js non genera tutti i tag `og:`, e in OpenGraph non risulta l'immagine. Stiamo monitorando la cosa...

#### Breadcrumbs

```
# Breadcrumbs
breadcrumb:
  display: true
```

Basta cambiare `true` con `false` per nascondere le *breadcrumbs* in tutte le pagine

#### URL del sito

Es.: `url: https://grusp.isunder.review/` è il valore predefinito nel repo originale, ed è l'URL completo del sito di staging

Viene usato per generare FQURLs dagli URI relativi.

#### Formati data

Usati sia nel frontend, sia per generare i valori dei tag `<time>` delle pagine.

```
# Date / Time format
date_format: YYYY-MM-DD
time_format: HH:mm:ss
date_format_hero: MMMM DD, YYYY
time_format_schedule: HH:mm
```

Oltre a quello standard, ce ne sono due specifici per `hero` (in realtà viene usato quasi ovunque questo) e per `schedule` (viene *visualizzata* solo l'ora)

* i parametri di configurazione standard di Hexo (separati da un commento "############# standard config: do not change")

### Tema

Il sito ha due temi:

* `_grusp_base` contiene tutti gli asset per tutte le conferenze (20200824: tranne alcune immagini, già segnalate); usato come "warehouse" per tutti gli assset, e per test
* `grusp_conf` contiene solo gli asset della conferenza: per "scegliere" gli asset,
  * copiare gli asset da `_grusp_base` (in cui tutti gli asset specifici per conferenza sono indicati da un suffisso, per es. `defaults_angularday.sass`, `conference-logo_angularday.png`, etc.)
  * **NB** togliere il suffisso: ad es. il file defaults si deve chiamare `defaults.sass`

#### Elenco dei file interessati

* source/assets/css/defaults.sass
* source/assets/favicons/android-chrome-192x192.png
* source/assets/favicons/android-chrome-512x512.png
* source/assets/favicons/apple-touch-icon.png
* source/assets/favicons/favicon.ico
* source/assets/favicons/favicon-16x16.png
* source/assets/favicons/favicon-32x32.png
* source/assets/favicons/mstile-150x150.png
* source/assets/favicons/safari-pinned-tab.svg
* source/assets/img/conference-logo.png
* source/assets/img/hero/hero.jpg
* source/assets/img/venue/venue.jpg
* source/assets/img/workshop/worjshop_header.jpg

#### Selezione del tema

* per i test, scommentare la riga corrispondente a "grusp_conf" in `_config.yml` e commentare la riga corrispondente a "_grusp_base"
* per i siti delle conferenze, commentare "_grusp_base" e scommentare "grusp_conf"

### Configurazione generale del tema

Si trova in `themes/[directory del tema]/_config.yml` e contiene:

* selezione della lingua
* main menu
* workshops submenu (se serve)
* welcome submenu
* stylesheets e scripts (da non cambiare! puntano direttamente ai file compilati e vengono usati in `<header>`)

#### Selezione della lingua

Es.: `language: "en"`

La lingua è in formato ISO (ovvero si potrebbe usare `"en-us"`)

#### Main menu

```
# main menu navigation
menu:
  welcome: welcome
  talks_speakers: talks
  sponsor: sponsor
  schedule: schedule
  # menu item for workshop
  workshop: workshop
```

Ad es. se non si vuole la pagina `schedule` nel menu, perché per esempio non è stata ancora definita, basta commentare la riga corrispondente.

La chiave è il filename della pagina corrispondente (ad es. `talks_speakers`; nel menu viene creato il link a `talks_speakers.html`); il valore è la label della voce di menu.

#### Workshops submenu

```
# workshops submenu (comment out if only one workshop: add items for multiple workshops)
workshop_submenu:
  workshop_1: rails and vue
  workshop_2: sample second workshop
```

Se c'è un solo workshop, si commenta l'intera sezione. Altrimenti, qui si definiscono gli `id` dei singoli workshop e i titoli delle voci di menu.

Vedere anche più avanti, "Workshop"

#### Welcome submenu

```
# welcome submenu
welcome_submenu:
  about: about
  coc: code of conduct
  scholarships: scholarships
  where: where
  # delete this row to take out of the menu
  cfp: call for papers
```

Qui si definisce il sottomenu di "welcome". In genere si può non toccare; se si vuole non creare una voce del sottomenu, basta commentare la riga corrispondente (ad es. per non fare apparire nel menu la voce "cfp")

## Conferenze online

**Fuso orario**: è specificato in `/_config.yml`, default "Europe/Rome"

```
timezone: 'Europe/Rome'
```

Hexo applica automaticamente la conversione delle date usando `moment.js`.

La direttiva che dice se una conferenza è online è all'inizio del file `/source/_data/defaults.yml`:

```
  # Online-only conferences
  is_online_only: false
```

Impostandola a `true`, alcuni componenti e pagine assumono un layout diverso; inoltre cambiano alcune impostazioni generali di visualizzazione.

Inoltre ci sono alcune chiavi che vengono utilizzate come alternativa ai dati relativi alla location (visto che non c'è una location fisica):

```
  online_location: "online"
  online_location_title: "The Internet"
  online_location_info: "The conference will be held online"
```

Nelle pagine in cui è specificato la location (o assenza di),

* `online_location` viene utilizzato nelle righe informative (quelle con le icone placeholder, calendario, etc.) al posto di `city`
* `online_location_title` viene utilizzato come titolo (ad es. in *welcome/where*)
* `online_location_info` viene utilizzato come sottotitolo nel componente *location*

Quando si imposta `is_online_only: true`, alla generazione del sito vengono variate le seguenti cose:

* date
  * ovunque compaia un orario, viene visualizzata specificando il **fuso orario**, ad es. "September 16, 2020 09:00 CEST"
  * in tutti i casi in cui viene visualizzata la "location", al posto dell'icona "placeholder" a goccia viene mostrata l'icona "internet"
* home page
  * hero:
    * "location" (viene visualizzato `online_location`)
    * formato data/ora (viene specificato il fuso orario)
    * come sfondo viene usato `hero-online.jpg` invece di `hero.jpg`; **@TODO** al momento (20200526) le due immagini sono uguali; bisogna sostituire `hero-online.jpg` con un'immagine ad hoc
  * cfp
    * formato data/ora deadline (viene specificato il fuso orario)
  * workshop
    * "location" (viene visualizzato `online_location`)
    * formato data/ora (viene specificato il fuso orario)
  * location
    * vengono visualizzati `online_location`, `online_location_title`, `online_location_info` al posto di città, nome hotel, indirizzo
    * viene nascosto il pulsante *get directions*
    * come sfondo viene usato `venue-online.jpg` invece di `venue.jpg`; **@TODO** al momento (20200526) le due immagini sono uguali; bisogna sostituire `venue-online.jpg` con un'immagine ad hoc
* welcome
  * where
    * icona "internet" al posto di icona "placeholder" accanto al titolo
    * **NB** per gli altri contenuti di *welcome/where/* si utilizzano le stesse chiavi, ma si scriveranno le info relative a modalità di accesso, etc.
* talks
  * riga informativa accanto al titolo (o righe colorate con luogo, data e ora, se ci sono più giornate):
    * viene visualizzato `online_location`
  * formato data/ora (viene specificato il fuso orario)
* schedule
  * formato data/ora (viene specificato il fuso orario)

* workshop (single)
  * come sfondo viene usato `worskhop_header-online.jpg` invece di `worskhop_header.jpg`; **@TODO** al momento (20200526) le due immagini sono uguali; bisogna sostituire `worskhop_header-online.jpg` con un'immagine ad hoc
  * sopra il titolo viene visualizzato `online_location` (che va specificato in `/source/_data/workshop.yml`) con la relativa icona
  * formato data/ora (viene specificato il fuso orario)
  * box informativi neri in fondo alla pagina
    * "where"
      * si continua a usare `location_name` (che va specificato in `/source/_data/workshop.yml`)
      * **non** vengono visualizzati indirizzo e contatti
    * "cosa e quando"
      * formato data/ora (viene specificato il fuso orario)
      * si continua a usare `location_additional_info` (che va specificato in `/source/_data/workshop.yml`)

**Q&A**:
*Q*: Perché bisogna specificare la location online sia in `defaults` sia in `workshop`?
*A*: per coprire il caso in cui si tenga una conferenza in una location fisica e un workshop online.

## Contenuti

**NB** scrivere **sempre** le date in Formato ISO (`YYYY-MM-DDTHH:MM`), ad es. `2020-09-16T09:00`; le date, oltre a essere riformattate per la visualizzazione in pagina, vengono usate per generare i tag `<time>` nelle varie pagine, e in alcuni casi per fare dei calcoli.

**NB** per tutte le chiavi che contengono testo, si può scrivere HTML, basta che il valore sia incluso fra doppi apici **"** -- se servono apici nel contenuto, ad es. per un link, usare apici singoli **'** : ad es. `"lorem ipsum <a href='url' >label</a>"...`

In generale, quando un valore non serve (o non se ne conosce ancora il contenuto), è buona prassi non cancellare la chiave corrispondente, ma semplicemente lasciarla al suo posto senza specificare un valore, ad es.:

```
  location_address: ""
```

o

```
  location_address:
```

### Info base sulla conferenza

Si trovano in `/source/_data/defaults.yml`. Il file è diviso in diverse sezioni, che -- a parte la selezione del tema e la (ri)definizione del colore dominante, come descritto in "Tema", corrispondono ai diversi componenti della home page (alcuni dei quali vengono replicati in altre pagine).

Il file inoltre contiene alcuni dati usati "sotto il cofano" nella generazione del sito.

Dopo la sezione "Additional config" dove come detto si seleziona il tema, segue "Conference defaults". Tutti i dati si trovano all'interno della chiave `conference:`

```
  # Online-only conferences
  is_online_only: true
  online_location: "online"
  online_location_title: "The Internet"
  online_location_info: "The conference will be held online"
```

(per questa prima parte vedere [Conferenze online](#conferenze-online))

```
  # menu and general params
  menu_buy_tickets_label: "Buy tickets"
  buy_tickets_url: "https://rubyday-2020.eventbrite.com/"
```

Label dei pulsanti *Buy tickets*, tranne quello presente nella *hero section* della home page (vedi sotto); URL del sito per l'acquisto dei biglietti

```
  # additional info for microdata / schema.org
  md_city: "Verona"
  md_province: "VR"
  md_postal_code: "37138"
  md_address: "Via Longhena 42"
  organizer_url: "http://grusp.org/"
```

Dati addizionali per generare i microdata

```
  # contact email
  contact_email: "info@grusp.org"
```

La mail di contatto, usata un po' ovunque (footer, pagina COC, etc.)

### Home page e componenti

#### hero section

```
  # these are for the hero section
  title_pre: "Welcome to"
  title: "RubyDay"
  city: "Verona"
  date: 2020-09-16T09:00
  countdown_visible: true
  countdown_days: "days"
  countdown_hours: "hours"
  countdown_minutes: "minutes"
  countdown_seconds: "seconds"
  ticket_button_visible: true
  hero_buy_tickets_label: "Buy tickets now"
```

`countdown_visible` e `ticket_button_visible` se impostati a `false` nascondono rispettivamente la riga del countdown e il pulsante *Buy tickets now*

```
  # image credits (l'esempio è per la hero del CSS Day!)
  # hero_img_credits: "Image by Gianni Careddu - Own work, <a href='https://commons.wikimedia.org/w/index.php?curid=74821344ì target='_blank' rel='noopener noreferrer'>CC BY-SA 4.0</a>"
```

Se si usano immagini per le quali bisogna accreditare l'autore (o altre informazioni di licensing), si può usare `hero_img_credits` per farle visualizzare. Oltre al background di `hero`, vale lo stesso meccanismo per `location` e per le testate della pagina *Where* e delle pagine dei workshop.

**NB** il componente ha come sfondo `hero.jpg`. Se la conferenza è [online](#conferenze-online), viene invece usato `hero-online.jpg`.

#### Update: fascia da visualizzare subito sotto la `hero` in caso si voglia mettere in evidenza un annuncio o un'informazione "extra"

```
  # "update" component. set the first parameter to true to make it appear in home page, false means hidden
  update_visible: true
  update_is_warning: true
  update_warning_header: "Questo testo appare se l'update è impostato a *warning*. Potremmo sostituirlo con un'icona o altro 'segnale'"
  update_title: "Important information"
  update_description: "This is the description of such important information"
  update_link_url: "https://google.com/"
  update_link_label: "a link to google, just for the demo"
```

Impostando `update_visible` a `false` si nasconde il componente. Questo vale anche per **tutti gli altri componenti della home page**.

#### Call for papers

```
  # "call for papers" component. set the first parameter to true to make it appear in home page, false means hidden
  cfp_open: true
  cfp_readmore_label: "Read more"
  cfp_open_label: "Submissions accepted until"
  cfp_open_title: "Call For Papers Now Open!"
  cfp_deadline: 2020-06-30T17:00
  cfp_register_label: "Apply now"
  cfp_register_aria_label: "Apply now for our Call for papers"
```

(Non viene nascosta automaticamente qyando si raggiunge la data della deadline perché si potrebbe voler visualizzare per un periodo "Call for papers closed"...)

#### General info: la fascia con i 4 pulsanti quadrati sulla destra

```
  # "general information" ("what is it?") component
  geninfo_visible: true
  geninfo_title: "What is it?"
  geninfo_description: "bla bla bla... testo libero"
  geninfo_about_label: "About"
  geninfo_coc_label: "Code of conduct"
  geninfo_scholarships_label: "Scholarships"
  geninfo_tickets_label: "Buy tickets"
```

**NB** le info per il blocco dei pulsanti social vegono inserite più avanti, vedere "Footer"

#### newsletter

Il componente *newsletter* viene riutilizzato in (quasi) tutte le pagine.

Qui, oltre alle label per la form, si definiscono i parametri "nascosti", che vengono passati al parziale `` insieme a nome, mail etc.

```
  # this is for the Newsletter block
  newsletter_title: "Stay in the loop!"
  newsletter_subtitle: "Subscribe to our newsletter"
```

Qui si definisce a quali liste iscrivere il mittente:

```
  # fields taken from the Mail chimp default form -- set to `true` to add subscription
  newsletter_lists:
    php: false
    javascript: false
    design: false
    devops: false
    frontend: false
    ruby: true
    entrepreneurship: false
    local_events: false
    everything: false
```

Queste sono le label dei campi della form:

```
  newsletter_firstname_label: "First name"
  newsletter_lastname_label: "Surname"
  newsletter_email_label: "Email"
  newsletter_lang_challenge: "Can you understand Italian?"
  newsletter_lang_label: "Of course, certamente!"
  newsletter_privacy_label: "I have read and accept the "
  newsletter_privacy_link_label: "privacy policy"
```

E questi sono i dati per creare i link alla privacy policy di Mailchimp

```
  newsletter_disclaimer: "We use Mailchimp as our email marketing platform. By subscribing to the newsletter, you accept that your data are transmitted to Mailchimp to be processed. "
  newsletter_legal_url: "https://mailchimp.com/legal/"
  newsletter_legal_label: "Information about Mailchimp's privacy policy"
```

#### speakers

```
  # "speakers" component. set the first parameter to true to make it appear in home page, false means hidden
  speakers_visible: true
  speakers_title: "speaker"
```

Gli altri dati vengono presi dal file `talks_speakers.yml`; vedere più avanti.

**NB** vengono inclusi solo gli speaker che hanno l'attributo `speaker_in_speaker_lists` === `true` (che è il valore predefinito): vedere [talks](#talks).

**NB** se la lingua del sito è l'inglese, e ci sono più speakers, sl titolo del componente viene aggiunto programmaticamente il suffisso "S" ("speaker" => "speakers").

#### topics

```
  # "topics" component. set the first parameter to true to make it appear in home page, false means hidden
  topics_visible: true
  topics_title: "Topics and themes"
  topics_description: "This is what we shall talk about..."
  topics:
    - "Ruby"
    - "Ruby on Rails"
  topics_payoff: "...and much more!"
```

I topic non sono altro che tag. Per inserirne di nuovi, aggiungere righe

```
    - "new topic"
```

Attenzione al trattino iniziale! è **necessario** (perchè non c'è `key`: i topic sono un array e non un oggetto JSON)

#### workshops

```
  # "workshop" component. set the first parameter to true to make it appear in home page, false means hidden
  workshop_visible: true
  workshops_title: "workshop"
  workshops_tickets_label: "Buy tickets"
  workshops_readmore_label: "Read more"
  workshops_register_label: "Register"
```

Gli altri dati vengono presi dal file `workshop.yml`; vedere più avanti.

#### media (fascia con immagini e video)

```
  # Media section in home page. set the first parameter to true to make it appear in home page, false means hidden
  media_visible: true
```

In questa fascia possiamo inserire 4 immagini a scelta...

```
  media_pic_1: "sample_pic_1.jpg"
  media_pic_2: "sample_pic_2.jpeg"
  media_pic_3: "sample_pic_3.jpeg"
  media_pic_4: "sample_pic_4.jpg"
```

**NB**: inserire le immagini in `/source/img/media/`, i `src` vengono creati dinamicamente ma non troppo ;)

...e una playlist

```
  #   playlist: if true, the iframe will be created. if false, it will not
  media_video_playlist: true
```

(se `false`, non viene visualizzato nessun video)

```
  # if `media_video_is_youtube` is `true`, the relevant playlist will be embedded via "media_video_playlist". If it is `false`, the relevant Vimeo channel will be embedded via "media_vimeo_channel"
  media_video_is_youtube: false
```

(se `true`, viene creato un link per YouTube; se `false`, per Vimeo)

Questi sono dati statici: li cambieremo se YouTube e/o Vimeo cambieranno la struttura dei loro siti ;)

```
  youtube_base_url: "https://www.youtube.com/embed/videoseries?list="
  vimeo_base_url: "https://vimeo.com/album/"
  vimeo_url_suffix: "/embed"
```

Qui invece i dati "veri": l'ID della playlist di YouTube, o l'ID dello "showcase" di Vimeo

```
  #   (embed YouTube playlist: prendere l'ID della lista dall'URL, la parte dopo '&list=', e metterla qui sotto)
  youtube_playlist_id: "PLWK9j6ps_unmgzGOw3cbjS8ID-b-cF1d9"
  #   (embed Vimeo showcase: prendere l'ID dello showcase e metterla qui sotto)
  vimeo_showcase_id: "6048109"
```

#### location / where

```
  # Location section in home page. set the first parameter to true to make it appear in home page, false means hidden
  location_visible: true
  location_name: "Hotel San Marco"
  location_address: "Via Longhena 42, 37138 Verona (VE) Italy"
  location_maps_url: "https://www.google.com/maps/place/Hotel+San+Marco+Fitness+Pool+%26+SPA/@45.4399961,10.9697441,17z/data=!3m1!4b1!4m8!3m7!1s0x4781e1e30a8be6af:0x8091b108e1d130c6!5m2!4m1!1i2!8m2!3d45.4399961!4d10.9719328"
  location_maps_label: "Get directions"
  location_readmore_label: "Read more"
  # image credits (l'esempio è per la hero del CSS Day!)
  venue_img_credits: "Image by Gianni Careddu - Own work, <a href='https://commons.wikimedia.org/w/index.php?curid=74821344ì target='_blank' rel='noopener noreferrer'>CC BY-SA 4.0</a>"
```

Impostare `location_visible` a `false` se non si vuole fare comparire la fascia! Ad es. nel caso delle conferenze solo online

**NB** nel caso delle [conferenze online](#conferenze-online) questo componente viene nascosto.

#### sponsor

Il componente *sponsor* viene riutilizzato in (quasi) tutte le pagine.

```
  # Sponsors section in home page. set the first parameter to true to make it appear in home page, false means hidden
  sponsors_visible: true
  sponsor_title_home: "Sponsors"
```

Gli altri dati vengono presi dal file `sponsors.yml`; vedere più avanti.

#### community partner

```
  # this is for the Community partners section in home page
  community_partners: true
  community_partners_title: "Community Partners"
```

Anche questi dati vengono presi dal file `sponsors.yml`; vedere più avanti.

### Footer

Nel footer, alcuni dati (ad es., la data)  vengono ripresi da ciò che abbiamo definito all'inizio del file; il resto è qui!

#### Pulsanti **social**

```
  # this is for the Social links block
  social_follow: "Follow us on"
  social_fb_url: "https://www.facebook.com/RubyDayIT/"
  social_linkedin_url: "https://www.linkedin.com/company/grusp/"
  social_twitter_url: "https://twitter.com/rubydayIT"
  social_vimeo_url: "https://vimeo.com/grusp"
  social_youtube_url: "https://www.youtube.com/channel/UCdWnwC8nz_CCFQrmLBrLCVw"
```

(il blocco, oltre che nel componente "general info" visto sopra, viene riutilizzato anche nella pagina *welcome*)

#### extra

```
  # 404
  back_to_home_label: "back to home page"
```

Questo dato è usato solo come testo per un link nella pagina *404 - not found*: vedere più avanti, "404 page"

#### past editions

Questo viene usato per creare i link ai siti delle passate edizioni:

```
  #   this is for the "previous editions" links
```

L'URL base dei siti:

```
  base_url: "rubyday.it/"
```

...dopodiché i link vengono creati dinamicamente, ad es. `https://2011.[base_url]`

```
  past_editions_pre: "Browse past editions:"
  past_editions:
    2011: "2011"
    2012: "2012"
    2013: "2013"
    2014: "2014"
    2015: "2015"
    2016: "2016"
    2019: "2019"
  past_editions_videos_pre: "All videos from the past editions are available on "
  past_editions_videos_vimeo_label: "Vimeo"
  past_editions_videos_mid: " and "
  past_editions_videos_youtube_label: "YouTube"
  past_editions_videos_post: "."
```

...gli altri dati sono i testi e le label. **NB** le URL dei link a Vimeo e YouTube sono presi dal blocco **social**!

#### e per finire...

...l'ultima parte del footer, in fondo a tutto:

```
  footer_copy_text: "is &copy; by Grusp and its awesome staff"
  footer_contact_text: "Contact us at "
  footer_links_pre: "You can read our "
  footer_links_privacy_link_label: "privacy policy"
  footer_link_middle: " and our "
  iubenda:
    # sostituire tutti questi parametri con quelli generati nel dashboard di iubenda.com per la conferenza cfr. https://gist.github.com/mbeccati/1bd9e562905a90e14d7d88ed3dcea34c
    cookiePolicyId: 55680650
    siteId: 1063123
    lang: en
    enableRemoteConsent: true
    localConsentDomain: phpday.it
    rebuildIframe: true
  privacy_policy_url_common: "https://www.iubenda.com/privacy-policy/"
  footer_coc_link_label: "code of conduct"
```

L'URL del link "privacy policy" in fondo al footer vioene composta con `privacy_policy_url_common` + `cookiePolicyId` per puntare alla policy giusta, generata nel dashboard di Iubenda.

```
  # Google Tag Manager
  google:
    tag_manager_id: "GTM-KJHB748"
```

`tag_manager_id` viene preso dal dashboard di Google (cfr. https://gist.github.com/mbeccati/1bd9e562905a90e14d7d88ed3dcea34c)

### welcome

I dati si trovano in `/source/_data/page_welcome.yml`.

Il blocco "intro" contiene solo del testo libero...

```
intro:
  main_title: "Welcome"
  content_1: "RubyDay 2020 is the eighth edition of the Italian Ruby Conference, organised by GrUSP, organisers of events such as PHPDay and JSDay. Tehe event has an international audience and all session will be held in English."
  content_2: "The event's goal is to allow all Rubyists to meet and share experiences while having fun and networking in an enjoyable context."
```

...e i due parziali "past editions" e "social" che abbiamo già visto in `defaults.yml`

Poi c'è la label per i link "read more", che vengono creati programmaticamente:

```
# this is the global "read more" label
readmore_label: "Read more"
```

Gli altri sono i blocchetti della fascia nera: sono tutti uguali...

```
info_about:
  title: "About"
  content: "Short intro to About page"
```

...e contengono solo il titoletto e la breve descrizione. L'unica eccezione è la label del link dei biglietti, e infatti l'ultimo blocco ha un parametro in più:

```
info_ticket:
  title: "Tickets"
  content: "The tickets are available on Eventbrite"
  # the tickets link is the only one that does not use the "global" label
  readmore_label: "GO"
```

### welcome/about

I dati si trovano in `/source/_data/page_about.yml`.

Comincia con l'intro sotto il titolo:

```
intro:
  main_title: "About"
  content_1: "[testo libero e/o HTML]"
  content_2: "[testo libero e/o HTML]"
```

(`content_2` è facoltativo; se è vuoto non viene visualizzato il secondo paragrafo)

Poi c'è la fascia colorata:

```
more:
  title: "More information"
  content_1: "[testo libero e/o HTML]"
  content_2: "[testo libero e/o HTML]"
```

(anche qui `content_2` è facoltativo; se è vuoto non viene visualizzato il secondo paragrafo)

Se non serve la fascia, commentare l'intero blocco. Se `more` e/o il suo contenuto non viene trovata o è vuota, la sezione non viene generata

Poi la fascia con il video:

```
past_edition:
  title: "Browse past editions"
  video_url: "https://www.youtube.com/embed/kgA2V85dPEg"
  video_caption: "Watch the video of the latest edition"
```

Se non serve la fascia, commentare l'intero blocco. Se `past_edition` e/o il suo contenuto non viene trovata o è vuota, la sezione non viene generata

Per finire c'è il team degli organizzatori: inizia con un breve testo

```
team:
  title: "Our team"
  intro: "Nata nel 2003 come associazione dedicata al solo mondo del PHP il GrUSP è diventata il punto di riferimento in Italia per le buone pratiche nel mondo dello sviluppo web. Organizziamo eventi, conferenze ed incontri informali coinvolgendo professionisti italiani ed internazionali. Puntiamo a rendere l'ecosistema del mondo italiano dello sviluppo web migliore sia sotto l'aspetto delle competenze che delle opportunità creando maggiore consapevolezza."
```

E poi ci sono i componenti del team

```
  members:
    member_1:
      name: "Francesco Fullone"
      role: "(his role)"
      pic_filename: "fili1.jpg"
    member_2:
      name: "Giulia Tosato"
      role: "(her role)"
      pic_filename: "giulia.jpeg"
```

**NB** le foto del team vanno messe in `/source/img/team/`

Per aggiungere nuovi membri del team, aggiungere uno o più blocchi `member_X` (attenzione: la chiave **deve** essere univoca, ad es. `member_3`, `member_4`, ...)

### welcome/coc

I dati si trovano in `/source/_data/page_coc.yml`.

```
intro:
  main_title: "Code of Conduct"
  content_1: "[testo libero e/o HTML]"
  content_2: "[testo libero e/o HTML]"
```

Poi ci sono la "short version" e la "long version". Entrambe iniziano allo stesso modo...

```
short_version:
  title: "The short version"
  content_1: "[testo libero e/o HTML]"
```

e

```
long_version:
  title: "The long version"
  content_1: "[testo libero e/o HTML]"
```

...ed entrambe possono includere fino a 6 paragrafi/sezioni di testo: `content_1`, `content_2`, ...`content_6`. Solo le sezioni "popolate" verranno visualizzate.

La `long_version` contiene anche un sottoblocco aggiuntivo, che viene usato per la sezione con il bordo colorato:

```
  contact_info_title: "Contact information"
  contact_content_1: "[testo libero e/o HTML]"
```

Anche qui ci sono diversi paragrafi/sezioni a disposizione, da `contact_content_1` a `contact_content_5`. Solo le sezioni "popolate" verranno visualizzate.

### welcome/scholarships

I dati si trovano in `/source/_data/page_scholarships.yml`.

```
intro:
  main_title: "Scholarships"
  content_1: "Diversity and inclusivity matter"
```

`intro` ha a disposizione fino a 3 paragrafi/sezioni a disposizione.

Poi ci sono la "short version" e la "long version". Entrambe iniziano allo stesso modo...

```
short_version:
  title: "The short version"
  content_1: "[testo libero e/o HTML]"
```

e

```
long_version:
  title: "The long version"
  content_1: "[testo libero e/o HTML]"
```

**NB** i `title` dfi entrambi i blocchi sono facoltativi. Se vuoti o non presenti non verranno visualizzati!

La `short_version` può includere fino a 6 paragrafi/sezioni di testo: `content_1`, `content_2`, ...`content_6`. Solo le sezioni "popolate" verranno visualizzate.

La `long_version` è differente: al posto di un unico `content_2` ci sono diverse chiavi...

```
  content_2_beginning: "You are invited to apply for "
  content_2_link_label: "a single conference ticket for rubyday"
  content_2_link_url: "https://forms.gle/K7b38LbqVuAJ61MK9"
  content_2_ending: "  . We will notify all applicants regarding the outcome of their application. We don’t cover travel/accommodation expenses."
```

...per permettere di non scrivere HTML direttamente nel "punto delicato" in cui si definisce il link per i biglietti dedicati.

Infine ci sono i *diversity sponsors*:

```
diversity_sponsors_title: "Thanks to our diversity sponsors"
diversity_sponsors:
  - logo_filename: "logo-welaika.png"
    site_url: "https://welaika.com/"
    name: "weLaika"
```

Per aggiungere uno o più sponsor, aggiungere un sottoblocco di tre righe come il primo di esempio (**NB** qui non c'è bisogno di specificare una chiave ma è importante il trattino iniziale! Insomma fare copiaeincolla ;) )

I loghi degli sponsor vanno messi in `/source/img/logos/`.

### welcome/where

**NB** questa sezione è da **aggiornare** appena terminate le modifiche per l'opzione "conferenza online"

I dati si trovano in `/source/_data/page_where.yml`.

La testata:

```
header:
  title_pre: "...and a lovely "
```

(il nome della città è preso da `defaults`!)

L'intro sotto la testata:

```
intro:
  main_title: "Where"
  content_1: "[testo libero e/o HTML]"
  content_2: "[testo libero e/o HTML]"
```

(`content_2` è facoltativo)

Le info sulla città ospite:

```
city_info:
  title: "The city"
  subtitle_1: "Subtitle 1"
  description_1: "[testo libero e/o HTML]"
  subtitle_2: "Subtitle 2"
  description_2: "[testo libero e/o HTML]"
```

**Tutti** i campi tranne `title` sono facoltativi (nel caso delle conferenze online, al posto di "The city" si può mettere ad es. "Useful information", e usare gli altri campi per dare informazioni su streaming e quant'altro)

La mappa:

```
map:
  title: "Location"
  map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.4793358997117!2d10.969744115556647!3d45.43999607910055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781e1e30a8be6af%3A0x8091b108e1d130c6!2sHotel%20San%20Marco%20Fitness%20Pool%20%26%20SPA!5e0!3m2!1sen!2sit!4v1587388989438!5m2!1sen!2sit"
  video_caption: "Watch the video of the latest edition"
```

L'intero blocco è facoltativo. Se è vuoto o non presente, non compare la fascia con la mappa

Gli hotel: (**NB** l'intero blocco sarà facoltativo come quello della mappa, appena fatte le modifiche per l'opzione "conferenze online")

```
hotels:
  title: "Hotel agreements"
  intro: "[testo libero e/o HTML]"
```

E i relativi accordi / convenzioni:

```
  agreements:
    hotel_1:
      name: "Hotel Leopardi"
      address: "Via Giacomo Leopardi, 16, 37138 Verona VR"
      website: "http://leopardi.vr.it"
      maps_url: "https://www.google.com/maps/place/Hotel+Leopardi/@45.4399957,10.963178,15z/data=!4m21!1m12!2m11!1shotel!3m5!1shotel!2s45.44,+10.9717!4m2!1d10.9716968!2d45.4399886!5m3!5m2!4m1!1i2!3m7!1s0x4781e1fb205821fd:0xa49414ecb16b1b73!5m2!4m1!1i2!8m2!3d45.4433788!4d10.9689555"
      phone: "+390458101444"
      phone_label: "045 8101444"
      email: "leopardi@leopardi.vr.it"
```

Per aggiungerne uno, copiare e incollare l'intero sottoblocco. **Attenzione**: qui è importante che l'ID sia univoco, ad es. `hotel_1`, `hotel_2`, etc.

Per finire, gli attributi `aria-label` per gli attributi di accessibilità dei link per i contatti degli hotel:

```
address_aria_label: "hotel address"
email_aria_label: "hotel email"
phone_aria_label: "hotel phone"
website_aria_label: "hotel phone"
```

### welcome/cfp

I dati si trovano in `/source/_data/page_cfp.yml`.

```
intro:
  main_title: "Call for papers"
  date_intro: "The call for papers is open until "
  # NB la data è definita in `defaults`
  content_1: "[testo libero e/o HTML]"
  content_2: "[testo libero e/o HTML]"
```

(`content_2` è facoltativo; come dice anche il commento, la deadline è già stata definita in `defaults`!)

La fascia colorata:

```
more_info:
  title: "More information"
  description_1: "[testo libero e/o HTML]"
  description_2: "[testo libero e/o HTML]"
```

(`description_2` è facoltativo)

La fascia con contatti e il pulsante "Apply":

```
contact:
  email_intro: "For any information that you may need, please write to "
  help_intro: "If you need suggestions on how to write the abstract, see "
  help_url: "http://helpmeabstract.com/"
cfp_register_url: ""
```

(Il pulsante *Apply* è generato programmaticamente; la label è quella definita in `defaults`, qui c'è l'URL)

### talks

I dati si trovano in `/source/_data/talks_speakers.yml`. Questo è l'unico file realmente complesso, perché include sia le informazioni per questa pagina sia quelle per la schedule e per il componente `speakers` della home page.

È diviso in tre sezioni: speakers, tracks, e "talks" propriamente detti.

La prima sezione è puramente di utilità: ci serve a definire gli speakers e dare a ognuno un identificativo, in modo da non dover scrivere tutti i dati nella struttura -- già complessa -- dei singoli talk, e da non doverli scrivere più volte (se ad es. uno speaker partecipa a più talk).

#### speakers

```
# Speakers. I mixin "&nome" servono per indicare quali speaker partecipano a ogni talk, sotto
speaker_1: &luca_guidi
  speaker_in_speaker_lists: true
  speaker_name: Luca Guidi
  speaker_pic_filename: lucaguidi.png
  speaker_role: Author of Hanami
  speaker_bio: "[testo libero e/o HTML]"
  speaker_github_url: "https://github.com/jodosha"
  speaker_twitter_url: "https://twitter.com/jodosha"
```

Cominciamo dalla prima riga:

```
speaker_1: &luca_guidi
```

Il "mixin" `speaker_1: &[qualcosa]` è l'identificativo. Ha un doppio valore:

* La chiave `speaker_X` deve essere univoca. Non ha importanza che sia per forza `speaker_[num]`; è importante che sia univoca e che possibilmente non contenga spazi o caratteri speciali, perché viene usata per creare l'`id` HTML del rispettivo oggetto nella pagina. Questo `id` è usato per
  * creare i link del menu laterale a scomparsa, che puntano alla prima istanza dello speaker presente nella pagina
  * creare i link corrispondenti nella pagina *schedule*, che puntano alla prima istanza dello speaker presente in questa pagina
* Il valore `&[qualcosa]` viene invece usato in questo stesso file (vedere anche più avanti) per associare lo speaker al/ai talk cui partecipa. Non ha importanza che sia il nome; è importante che sia univoco e che non contenga spazi o caratteri speciali (se no il compilatore potrebbe esplodere).

Gli altri dati vengono semplicemente ripresi e visualizzati ogni volta che in un talk si "richiama" lo stesso speaker. Note:

* `speaker_pic_filename`: il file corrispondente va messo in `/source/img/speakers`
* `speaker_github_url` e `speaker_twitter_url` sono facoltativi

**NB**: non tutti gli speaker devono comparire in questa pagina (e nel componente *speakers*). Il primo attributo, `speaker_in_speaker_lists`, serve proprio a questo. Il valore predefinito è `true`: se impostato a `false`, lo speaker (e il/i relativo/i talk) non comparirà nella pagina

#### tracks

Le tracks vengono usate nella *schedule*, per cui ne parliamo nella sezione dedicata.

#### talks

I talk hanno una struttura più complessa, che serve soprattutto per la *schedule*, per cui ne parliamo più avanti. Qui diciamo solo che i talk possono essere inseriti in un ordine a piacere; nella *schedule* vengono riordinati in ordine cronologico, mentre nel componente *speakers* vengono visualizzati nell'ordine in cui vengono inseriti i rispettivi talk nello YML.

**@todo**: in una prossima release si potrebbe pensare di inserire un ordinamento, in modo da poter scrivere i talk in ordine cronologico (più comodo per chi cura i contenuti) e poter comunque visualizzare gli speaker nell'ordine desiderato nel componente *speakers*.

La sezione dei talk propriamente detti ha una struttura complessa, che serve per la *schedule*, per cui ne parliamo meglio più avanti; riassumiamo però con quale logica viene creata questa pagina.

1. si cerca ogni istanza di ogni speaker nell'elenco
2. si recuperano i dati del talk corrispondente
  * orario e track vengono visualizzate solo se l'orario (`start_datetime`, `end_datetime`) è definito (serve per quando si sa già chi saranno gli speaker ma ancora non si è definita la schedule propriamente detta)
  * la `track` viene visualizzata solo se ce ne sono più di una
  * la parte del titolo viene composta con gli altri dati del talk -- ora, titolo, descrizione
3. per ogni speaker che partecipa al talk, viene visualizzato il box con i suoi dati

**NB** se la conferenza si sviluppa su più giornate, in cima alla pagina viene creata una "menu bar" con i pulsanti che "puntano" all'altezza del primo talk visualizzato per la giornata in questione; all'inizio di ogni "giornata" compare una fascia colorata con la data.

### schedule

I dati si trovano in `/source/_data/talks_speakers.yml`. Qui analizziamo meglio la struttura del file.

**NB** se non si vuole generare la pagina della schedule:
in `theme/_config.yml`, commentare la riga relativa in `menu` (in questo modo non viene aggiunto il relativo item al menu)

```
menu:
  ...
  # scommentare per generare pagina
  # schedule: schedule
```

La pagina viene comunque generata, ma non è raggiungibile da menu, e le tabelle della schedule non vengono generate. Il corpo della pagina consisterà in una sezione che contiene solo un titolo e un testo (liberi): questo perché se un crawler indicizza la pagina, almeno chi la visualizza non vedrà né un errore né una pagina bianca

```
generate_schedule_page: true
schedule_under_construction_title: "Schedule under construction"
schedule_under_construction_description: "We are still defining the schedule. Please be patient"
```

Degli speaker abbiamo già parlato nel capitolo precedente. Qui ci concentriamo su come viene costruita la schedule, partendo dalle `track`:

```
tracks:
  track_1: &track_1
    id: 1
    title: "Track 1"
```

Ogni track deve avere una chiave univoca (per es. `track_1`), un mixin univoco (per es. `&track_1`), e un `id` univoco. Per chiave e mixin valgono le stesse regole viste per gli speakers, mentre `id` **deve** essere un numero, e possibilmente **progressivo**. Questo è importante per poter gestire la tabella della schedule nei casi in cui ci sia un talk (o comunque un evento nel corso della giornata) che abbia durata differente dasi "talk normali", ad es. un workshop o un community event che duri due ore e avvenga in contemporanea ad altri talk di 45'...
Il `title` è testo libero. Potrebbe ad es. essere il nome della sala in cui si tengono i talk.

Finalmente la schedule propriamente detta: inizia con

```
days:
  day_1:
    date: 2020-09-16T09:00
    title: "Day 1"
```

Se la conferenza si sviluppa su più giorni, basterà inserire un secondo `day`: come sempre, la chiave può anche non essere nel formato `day_[num]`, basta che sia univoca. Il `title` è testo libero. La `date` serve a creare i microdati (schema.org) "sotto il cofano".

In ogni `day` ci sono tanti talk:

```
    talks:
      talk_1:
        ...
      talk_2:
        ...
```

Come al solito, le chiavi devono essere univoche. Non ha importanza se sono nel formato `day_[num]`; però, non devono contenere spazi, e possibilmente non dovrebbero contenere caratteri speciali, perché vengono utilizzate per creare dei link.
Come visto per la pagina *talks_speakers*, se ci sono più giornate viene creata una tabella per giornata con il programma, e in cima alla pagina viene creata la "menubar" con i pulsanti che "puntano" alle rispettive tabelle. La chiave del `day` viene usata come `id` del corrispondente oggetto nel DOM.

Ci sono diversi tipi di "talk": la cosa è descritta direttamente nel file YML

```
# NB "item_type": tipi di "talk"
#   "talk" -- un talk vero e proprio, che va anche in components/speakers e nella pagina talks_speakers
#   "service" -- coffee break, lunch break, etc
#   "keynote" -- **non** viene messo in components/speakers e nella pagina talks_speakers
#   "workshop" -- sessione straordinaria (non workshop full-day), x es community workshop / UG
#   "other" -- altro; si inseriranno solo ora, titolo, descrizione facoltativa
# NB tutti i "talk" devono avere una track. I "service" e i "keynote" dovrebbero avere track_1
```

Come accennato sopra, gli speaker associati ai "talk normali" (`item_type: "talk"`) vengono inclusi nel componente *speakers* e nella pagina *talks_speakers*, e gli altri no.

Tutti hanno attributi comuni:

```
        item_type: ["talk" | "service" | "keynote" | "workshop" | "other"]
        start_datetime: 2020-09-16T09:00
        end_datetime: 2020-09-16T09:30
        talk_title: "testo libero"
```

Ora e data di inzio e fine (in formato ISO come al solito) sono fondamentali per poter creare le tabelle.

Ogni tipo specifico può avere attributi diversi.

#### service

```
        item_type: "service"
        start_datetime: 2020-09-16T09:00
        end_datetime: 2020-09-16T09:30
        talk_title: "Coffee break"
        service_icon: "coffee"
```

`service_icon` è facoltativo; se è vuoto, o se non esiste, verrà trascurato.

I valori possibili:

* "coffee" -- nella riga corrispondente viene visualizzata l'icona della tazza di caffè
* "cutlery" -- nella riga corrispondente viene visualizzata l'icona delle posate
* "glass" -- nella riga corrispondente viene visualizzata l'icona del calice

Questo permette di mostrare a colpo d'occhio le pause -- coffee break, pranzo, rinfresco, aperitivo post conf etc.

Gli item di tipo "service" hanno un altro attributo facoltativo:

```
        host_name: "[testo libero]"
```

che può essere utile per informare su chi tiene una presentazione, una sessione informativa, etc.

#### keynote

```
        item_type: "keynote"
        start_datetime: 2020-09-16T09:45
        end_datetime: 2020-09-16T10:00
        talk_title: "Keynote title (optional)"
        talk_description: "Keynote description (optional)"
        speakers:
          speaker_1: *keynote_speaker
```

La notazione `*identificativo_speaker` richiama automaticamente le informazioni inserite nella prima sezione del file: ogni mixin (`&id`) viene richiamato scrivendo `*id`.
Il `talk_title` e la `talk_description` sono facoltativi; se sono vuoti o inesistenti, nella riga corrispondente comparirà solo "keynote" e gli autori.

Per aggiungere uno o più speaker, basta aggiungere righe sotto la chiave `speakers`: come al solito, attenzione all'allineamento; l'ID può essere in qualsiasi forma basta che sia univoco; non deve includere spazi.
Per capirci, se si vogliono avere identificativi più "parlanti", basta inserire ad es.

```
speaker_1: &yukihiro_matsumoto
  speaker_name: Yukihiro Matsumoto
  ...

      talk_X:
        ...
        speakers:
          yukihiro_matsumoto: *yukihiro_matsumoto
```

Tutti i tipi di talk possono avere più speaker, con l'eccezione di quelli di tipo "service".

**NB** i talk di tipo "service" o "keynote" occupano **sempre** l'intera largehzza della tabella. Non è enceassario indicare la `track`, perché non viene visualizzata.

**talk** propriamente detti

```
      talk_4:
        item_type: "talk"
        track: *track_1
        start_datetime: 2020-09-16T10:00
        end_datetime: 2020-09-16T10:45
        talk_title: [testo libero]
        talk_description: "[testo libero e/o HTML]"
        talk_video_url: "[URL]"
        host_name: "[testo libero]"
        speakers:
          speaker_1: *luca_guidi
```

Sia `host_name` sia gli `speakers` sono facoltativi. Lo stesso vale per `talk_video_url`.

Invece è importante specificare sempre la `track`, soprattutto quando ce ne sono più di una: viene usata come indice per capire in quale colonna della tabella posizionare i dati del talk.

#### workshop

Serve a identificare gli "eventi" che non sono propriamente talk, né item di servizio come pause o presentazioni, ma fanno parte dell'organizzazione della conferenza e magari avvengono in contemporanea ad altre attività. Di fatto la differenza rispetto ai talk "veri e propri" è che nella tabella verrà automaticamente aggiunta la parola "Workshop" prima del titolo. (i due punti, come in `Workshop: ` vengono aggiunti solo se il titolo è presente, se no comparirà la sola parola "Workshop" senza punteggiatura).

#### other

Un item "di appoggio" per qualsiasi uso. Nella tabella verranno visualizzati solo ora, titolo, descrizione (facoltativa).

#### La logica

Per riassumere, la pagina viene creata in questo modo:

* se ci sono più `day`, in testa alla pagina viene creata una "menubar" con pulsanti che "puntano" all'altezza delle rispettive tabelle
* per ogni `day` viene creata una tabella con il programma della giornata

Nella singola tabella, a parte l'intestazione colorata che ripete semplicemente la data:

* le righe vengono inserite in ordine cronologico, una per ogni `start_datetime` trovato nell'elenco dei talk. Questo permette, entro certi limiti, di avere tabelle "asincrone". Per fortuna le conferenze sono eventi ordinati ;)
* gli item di tipo "service" e "keynote" occupano sempre l'intera larghezza della colonna
* se ci sono più `track`, viene inserita una colonna per track
* gli item **non** di servizio vengono posizionati nella colonna corrispondente alla rispettiva `track`
* se un item dura di più rispetto agli altri che iniziano in contemporanea, "invaderà" la riga successiva

### workshop

I dati si trovano in `/source/_data/workshop.yml`.

Qui conviene affrontare prima la logica di creazione delle pagine, e poi vedere come è strutturato il file.

La situazione più comune è quella in cui si ha un solo workshop.

Nel filesystem del sito avremo

```
/source/
  workshop/
    index/ # directory vuoto
    index.md
```

Il file `index.md` contiene solo il `front-matter` di Hexo: ovvero il contenuto viene definito altrove (il layout nei nostri template, il contenuto nei file YML)

```
---
title: workshop
date: 2020-04-07 14:11:15
layout: page_workshops
---
```

`title` corrisponde a quanto definito in `_config` e di fatto serve solo nel caso in cui ci siano più workshop (vedere più avanti). `date` non serve a nulla, ma è un dato obbligatorio per cui possiamo lasciarlo così com'è (a meno che non interessi a noi specificarla, per motivi esterni alla generazione del sito in sé). `layout` è invece fondamentale perché l'interprete sappia che template usare!
Insomma non modifichiamo questo file :)

Se invece ci sono più **workshop**, bisogna creare i rispettivi file: ad esempio

```
/source/
  workshop/
    workshop_1/
      index/ # directory vuoto
      index.md
    workshop_2/
      index/ # directory vuoto
      index.md
    index/ # directory vuoto
    index.md
```

Le subdirectory non devono per forza essere chiamate `workshop_X`. Potrebbe essere opportuno usare nomi più "parlanti". Ad esempio, se la directory si chiama `workshop_1`, quando si genera il sito verrà generata una pagina `/workshop/workshop_1.html`, che dal punto di vista SEO non è proprio il massimo. Basterà chiamare la subdirectory ad es. `workshop-on-rails` per avere `/workshop/workshop-on-rails.html`.

**Attenzione** però: nel `_config` del tema (`/themes/[mytheme]/_config.yml`), bisogna allineare il submenu:

```
workshop_submenu:
  workshop-on-rails: rails and vue
  workshop_2: sample second workshop
```

In ogni subdirectory, il file `index.md` contiene qualche dato in più rispetto a quello del directory genitore:

```
---
title: rails and vue
date: 2020-04-21 09:27:00
layout: workshop_single
ws_id: workshop_1
path: workshop/workshop_1
permalink: workshop/workshop_1
# Used to generate breadcrumbs
parent: workshop
---
```

Le differenze rispetto al genitore:

* `layout: workshop_single` dice all'interprete di usare il template corrispondente per creare la pagina del workshop
* `ws_id`, `path`, `permalink`:
  * `ws_id` viene usato per far capire all'interprete quale dei `workshop` presenti nel nostro YML mostrare nella rispettiva pagina
  * `path` e `permalink` sono attributi predefiniti di Hexo. Non vengono usati direttamente, ma per leggibilità potrebbe essere buona cosa dar loro lo stesso valore di `ws_id`

C'è poi l'attributo `parent`, che viene usato per generare le *breadcrumbs*, e nel nostro caso non è da modificare.

In pratica:

* nel primo caso (un workshop) verrà generata solo la pagina `workshop.html` con i dati del singolo workshop
* nel secondo caso (più workshop) saranno generate:
  * `workshop.html` che però ha lo stesso aspetto del componente *workshop* della home page;
  * per ogni workshop, una pagina `/workshop/[title].html` che presenterà il rispettivo workshop;
  * nel menu principale, compariranno i sub-item come definiti in `/themes/[mytheme]/_config.yml`

Veniamo al **file YML con i dati**.

Inizia con alcuni dati di uso generale:

```
read_more_label: "read more"
summary_page_aria_label: "workshops page"
summary_page_button_label: "See all workshops"
# image credits (l'esempio è per la hero del CSS Day!)
# workshop_img_credits: "Image by Gianni Careddu - Own work, <a href='https://commons.wikimedia.org/w/index.php?curid=74821344ì target='_blank' rel='noopener noreferrer'>CC BY-SA 4.0</a>"
```

Le prime tre chiavi vengono usate per i link / pulsanti; `workshop_img_credits`, facoltativo, serve a inserire le informazioni di licensing dell'immagine di testata se necessario.

**NB** l'immagine di testata si trova in `/themes/[mytheme]/source/assets/img/workshop`. Per cambiarla, basta inserire in questo directory un file `worskhop_header.jpg`. Quando si genera il sito, verranno automaticamente creati i "tagli" dell'immagine per i vari device.
**NB** se la conferenza è [online](#conferenze-online), viene invece usato `worskhop_header-online.jpg`. **@TODO** al momento (20200526) le due immagini sono uguali; bisogna sostituire `worskhop_header-online.jpg` con un'immagine ad hoc

```
workshops:
  workshop_1:
    ws_id: workshop_1
```

`ws_id` è lo stesso valore inserito nel rispettivo file `index.md`

```
    is_external: false
```

`is_external`: usato nel caso in cui si ospita un workshop organizzato da terzi, che magari ha il suo sistema di ticketing; se impostato a `true`, alcuni dei dati del worskhop verranno trattati diversamente.

```
    page_uri: "workshop/workshop_1.html"
```

Ripete quanto definito nel rispettivo file `index.md`

Informazioni generali:

```
    page_title: "[testo libero]"
    workshop_title: "[testo libero]"
    ticket_url: ""
    ticket_label: "Register now"
```

`ticket_url` e `ticket_label` servono per i pulsanti "iscriviti" ripetuti più volte nella pagina.

Seguono i dati per il blocco riassuntivo in fondo alla pagina (vengono inseriti in cima perché alcuni vengono usati anche prima):

Dati sulla location, usati per il blocco "where":

```
    location_title: "Dove"
    location: "Verona"
    online_location: "online"
    # location_name: "Hotel San Marco"
    location_name: "The Internet"
```

`online_location` viene usato al posto di `location` se la conferenza è online (vedere [Conferenze online](#conferenze-online)).

Seguono le informazioni di contatto della location (usate solo se la conferenza **non** è online):

```
    location_contact_phone: "+045569011"
    location_contact_email: "sanmarco@sanmarco.vr.it"
    location_contact_url: "https://www.sanmarco.vr.it/"
    location_address: "Via Longhena 42, 37138 Verona (VE) Italy"
    location_maps_url: "https://www.google.com/maps/place/Hotel+San+Marco+Fitness+Pool+%26+SPA/@45.4399961,10.9697441,17z/data=!3m1!4b1!4m8!3m7!1s0x4781e1e30a8be6af:0x8091b108e1d130c6!5m2!4m1!1i2!8m2!3d45.4399961!4d10.9719328"
    location_maps_label: "Get directions"
    location_additional_info: "L'hotel offre tariffe scontate ai partecipanti ai workshop, sia per camere singole sia per camere doppie."
```

Info addizionali, usate per il secondo blocco:

```
    whatandwhen_title: "Cosa e quando"
    whatandwhen_additional_info: "Registrazione, caffè e pranzo inclusi"
    date: 2020-09-15T09:30
    end_date: 2020-09-15T16:30
```

(Se la conferenza è online, in pagina verrà visualizzato il fuso orario)

Info sulla lingua di lavoro: usato anche in cima alla pagina, sotto il titolo

```
    language_title: "Lingua"
    language: "italian / italiano"
    language_ext: "Language: Italian / Lingua: italiano"
    language_additional_info: "No translation provided."
```

Il quarto blocco "teacher" riprende i dati dei teacher (vedere più avanti).

Info sull'eventuale collaborazione con soggetti terzi (facoltativo):

```
    collab: "Workshop realizzato in collaborazione con <a href='https://nebulab.it/' target='_blank' rel='external noopener nofererrer'>Nebulab</a>"
```

Descrizione breve, usata nel componente *worskhop* (home page, e pagina "riassuntiva" se presente):

```
    description: "Lorem ipsum dolor sic amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
```

Descrizione lunga: testo libero e/o HTML, usato nella parima sezione della pagina del workshop singolo

```
    description_long: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
```

Video se presente:

```
    # video trailer?
    trailer: true
    trailer_url: "https://player.vimeo.com/video/352012164"
```

(se `trailer: false`, non verrà visualizzato alcun video)

#### Sezione teacher

```
    # nota sul titolo: se il linguaggio specificato in `language` NON in clude 'italian', in pagina viene aggiunta la "s" finale
    teacher_title: "Teacher"
```

`teacher_title` è il titolo della sezione

E poi definiamo i teacher propriamente detti.

```
    teachers:
      teacher_1:
        teacher_name: "Andrea Vassallo"
        teacher_bio: "[testo libero e/o HTML]"
        pic_filename: "andreavassallo.png"
        teacher_role: "full stack developer"
        teacher_org: "Nebulab"
      teacher_2:
        ...
```

Valgono le regole sulle chiavi viste per i talk, gli speaker, etc.

L'immagine dello speaker va messa in `/source/img/ws_teachers`.

Fascia Topics:

```
    topics_title: "Argomenti"
    topics:
      - "Topic 1"
      - "Topic 2"
      - ...
```

Vengono usati per creare la lista puntata degli argomenti. Testo libero. Per aggiungerne, basta aggiungere righe; non hanno chiave, ma attenzione all'allineamento!

Ulteriori informazioni

```
    addressees_title: "A chi è rivolto"
    addressees_description: "[testo libero e/o HTML]"
    requirements_title: "Requisiti di partecipazione"
    requirements_description: "[testo libero e/o HTML]"
    useful_info_title: "Informazioni utili"
    useful_info_description: "[testo libero e/o HTML]"
```

Naturalmente si possono cambiare sia i titoli sia i contenuti; anche se le chiavi si chiamano `addressees_...`, `requirements_...`, è testo libero. In questo modo si possono distribuire le informazioni liberamente.
Se si desidera ad es. visualizzare solo due sezioni titolo + paragrafo, basta annullare i valori di `useful_info_...`:

```
    useful_info_title:
    useful_info_description:
```

Fascia colorata

```
    # CTA
    cta_title: "Hurry up. There are only a few available places!"
```

(il pulsante viene generato con URL e label comuni, definite sopra)

Per creare un altro workshop, oltre a inserire una nuova sezione corrispondente alla prima, con le stesse regole...

```
  workshop_2:
    ws_id: workshop_2
    is_external: false
    ...
```

...bisogna ricordarsi di creare i corrispondenti file in `/source/worshop/` come spiegato all'inizio del capitolo.

### Sponsor

Questa parte riguarda sia la pagina *sponsor*, dove vengono descritte le varie tipologie di sponsorship disponibili, sia il componente *sponsors* che compare nella homepage e in quasi tutte le altre pagine del sito.

#### pagina "sponsor"

I dati si trovano in `/source/_data/page_sponsor.yml`.

Intro:

```
intro:
  slogan_1: "Is your activity connected with Ruby or the Web?"
  slogan_2: "Do you want to participate in the making of Ruby Day?"
  content_1: "Great idea! You will contribute to the success of an event that is unique in Italy and will receive a remarkable visibility."
  content_2: "A short description of the venue is necessary before detailing the six levels of sponsorship: the conference will be held in different rooms, all facing an atrium with a reception where various stands will be available for informations. GrUSP will be present with a stand for informations and registrations."
  content_3: "By stand we mean a space at your disposal with 1 or 2 tables, a couple of chairs, network connectivity and power supply."
```

`content_3` è facoltativo.

Fascia colorata:

```
block_2:
  title: "Sponsorship options"
  slogan: "You can sponsor RubyDay in several ways:"
  subtitle_1: "Special events"
  content_1: "During the conference there are various moments for social aggregation between participants: coffee breaks, lunch, social night, speaker's dinners and pre-dinner aperitifs. Please get in touch with us to arrange the options that best suits your needs, or to share a brilliant sponsoring idea."
  subtitle_2: "Full packages"
  content_2: "You can also choose between one of the following sponsorship packages. May you need any additional information just get in touch with an email to "
```

(Segue un blocco di commenti che è servito a me come promemoria per impostare le feature dei vari livelli)

Infine, le opzioni disponibili.

```
levels:
  level_1:
```

(Per le chiavi dei livelli valgono le stesse regole viste per le chiavi delle altre liste)

Per ogni livello di sponsorship, si definiscono il nome, l'importo, l'eventuale dicitura sull'IVA, e il numero di slot disponibili in totale:

```
  level_1:
    name: Main
    amount: 10000
    vat_label: "(+ VAT 22%)"
    available_slots: 1
```

(Il numero di slot *ancora disponibili* viene calcolato automaticamente sulla base del file dove si elencano gli sponsor; vedere più avanti)

E poi le feature del livello:

```
    description_1:
      - "1 dedicated session (30 mins max, no commercial talks accepted)"
      - "One direct email marketing campaign"
    description_2:
      - "Access to opt-in attendees list"
    description_3:
      - "Your logo in pre-event communications"
      - "Your logo on conference website"
      - "Your logo on conference rollups"
      - "Your own rollup in the conference room"
    description_4:
      - "Main Stand (table 2m x 1m)"
    description_5:
      - "Bring your own gadgets (flyers, stickers, t-shirts)"
    description_6:
      - "<strong>5</strong> free tickets"
    description_7:
      - "<strong>5</strong> tickets with <strong>50%</strong> discount"
```

**Tutte** le `description_...` sono facoltative. Conviene comunque inserirle in ordine, non solo per chiarezza, ma perché la loro gerarchia serve al template per colorare le varie righe delle tabelline.

#### componente "sponsors"

I dati dei soggetti che hanno offerto la sponsorship si trovano in `/source/_data/sponsors.yml`.

A parte il titolo del componente...

```
sponsors_block_title: "Thanks to"
```

...per ogni livello si elencano gli sponsor:

```
main:
  sponsor1:
    name: "weLaika"
    logo_filename: "logo-welaika.png"
    site_url: "https://welaika.com/"
diamond:
  sponsor1:
    name: "weLaika"
    logo_filename: "logo-welaika.png"
    site_url: "https://welaika.com/"
...
```

Il logo va messo in `/source/img/logos/` (un luogo solo per tutti, compresi i community e i diversity sponsor)

Per aggiungere uno o più sponsor, basta aggiungere un blocco `sponsorX`. Come al solito, non è importante che la chiave contenga un ordinale, basta che sia univoca).

Se **non ci sono** sponsor a un dato livello, per esempio "diamond", basta commentare o cancellare *tutto* il relativo blocco, inclusa la chiave del livello: ad es.

```
# diamond:
#   sponsor1:
#     name: "weLaika"
#     logo_filename: "logo-welaika.png"
#     site_url: "https://welaika.com/"
...
```

In questo modo, nella visualizzazione non comparirà per nulla la sezione relativa al livello "diamond".

In fondo al file c'è una sezione dedicata ai **community partner**, che vengono visualizzati nel componente *community_partners*:

```
community_partners:
  cp_1:
    name: "React Alicante"
    website_url: "http://reactalicante.es/"
    logo_filename: "react-alicante.png"
```

Valgono le stesse regole, tranne che i loghi vanno messi in `/source/img/community/`.
