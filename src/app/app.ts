import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface GiftItem {
  nome: string;
  categoria: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  rsvpForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  // Controle do Modal de Pix
  activeModal = false;
  selectedGift = '';
  copiedText = false;
  pixKey = '(81) 98748-1681'; // Altere para a chave Pix real

  // 20 itens organizados conforme especificado
  giftItems: GiftItem[] = [
    // Cozinha
    { nome: 'Jogo de colheres de silicone', categoria: 'Utilidades de Cozinha' },
    { nome: 'Conjunto de potes de vidro herméticos', categoria: 'Utilidades de Cozinha' },
    { nome: 'Espremedor de alho em aço inox', categoria: 'Utilidades de Cozinha' },
    { nome: 'Cortador de legumes multifuncional', categoria: 'Utilidades de Cozinha' },
    { nome: 'Afiador de facas ergonômico', categoria: 'Utilidades de Cozinha' },
    { nome: 'Organizador de talheres', categoria: 'Utilidades de Cozinha' },
    { nome: 'Descansos de panela em bambu', categoria: 'Utilidades de Cozinha' },
    // Mesa Posta
    { nome: 'Conjunto de copos long drink', categoria: 'Mesa Posta' },
    { nome: 'Garrafa térmica para café (1L)', categoria: 'Mesa Posta' },
    { nome: 'Suporte rústico para xícaras', categoria: 'Mesa Posta' },
    // Decoração
    { nome: 'Par de almofadas decorativas texturizadas', categoria: 'Decoração' },
    { nome: 'Manta de algodão para sofá', categoria: 'Decoração' },
    { nome: 'Vaso de cerâmica minimalista', categoria: 'Decoração' },
    { nome: 'Difusor de varetas / aromatizador', categoria: 'Decoração' },
    { nome: 'Cesto de corda trançada', categoria: 'Decoração' },
    // Casal & Organização
    { nome: 'Par de canecas personalizadas do casal', categoria: 'Casal e Organização' },
    { nome: 'Quadrinho decorativo com nome dos noivos', categoria: 'Casal e Organização' },
    { nome: 'Tapete capacho "Bem-vindo"', categoria: 'Casal e Organização' },
    { nome: 'Chaveiro de parede rústico', categoria: 'Casal e Organização' },
    { nome: 'Kit com 10 cabides de veludo', categoria: 'Casal e Organização' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.rsvpForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      presenca: ['', Validators.required] // Garanta que esta linha esteja aqui se o campo existir na tela
    });
  }

  onSubmit(): void {
    if (this.rsvpForm.invalid) return;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    /* ======================================================================
      ATENÇÃO NOIVOS: INSIRA A URL DO SEU INTEGRADOR ABAIXO
      Substitua a URL fictícia pelo link gerado no SheetMonkey ou Formspree.
      ======================================================================
    */
    const endpointPlanilha = 'https://api.sheetmonkey.io/form/PTsu7gMdEWujNQJ5cvceX';

    this.http.post(endpointPlanilha, this.rsvpForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.rsvpForm.reset();
      },
      error: (err) => {
        console.error('Erro ao enviar RSVP', err);
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }

  openPixModal(giftName: string): void {
    this.selectedGift = giftName;
    this.activeModal = true;
    this.copiedText = false;
  }

  closeModal(): void {
    this.activeModal = false;
  }

  copyPix(): void {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      this.copiedText = true;
      setTimeout(() => this.copiedText = false, 3000); // Reseta texto após 3s
    });
  }
}