import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  Download,
  Grid3X3,
  Search,
  Sparkles,
  ChevronDown,
  PlayCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import garantia from "@assets/garantia.png";

import suelen_lungov_rodape_2 from "@assets/suelen-lungov-rodape-2.png";

type FloatingItem = {
  src: string;
  alt: string;
  className: string;
  delay: number;
  duration: number;
};

function useScrollParallax(max = 18) {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const next = Math.min(max, Math.max(-max, window.scrollY * 0.02));
      setY(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [max]);
  return y;
}

function Section({
  id,
  bg,
  children,
  className,
}: {
  id?: string;
  bg?: "white" | "cream" | "dark" | "magenta";
  children: React.ReactNode;
  className?: string;
}) {
  const bgClass =
    bg === "cream"
      ? "bg-[#F5F1E9]"
      : bg === "dark"
        ? "bg-black text-white"
        : bg === "magenta"
          ? "bg-[#9A1860] text-white"
          : "bg-white";

  return (
    <section id={id} className="relative w-full py-24 text-center pt-[63px] pb-[63px] bg-[#f0eeea]">
      <div className="container-px mx-auto max-w-[1100px]">
        {children}
      </div>
    </section>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const y = useScrollParallax(16);

  // Replacement for magenta #C41E7A globally to burnt orange #C2452D
  const goldGradientText = "text-[#C2452D]";
  const goldGradientBg = "bg-[#C2452D]";

  const items: FloatingItem[] = useMemo(
    () => [
      {
        src: "/colete-flutuante.png",
        alt: "Colete",
        className: "left-[2%] top-[10%] w-[100px] md:w-[140px]",
        delay: 0.2,
        duration: 4.8,
      },
      {
        src: "/camisa-flutuante.png",
        alt: "Camisa",
        className: "right-[2%] top-[25%] w-[110px] md:w-[160px]",
        delay: 0.0,
        duration: 4.2,
      },
      {
        src: "/tenis_flutuante.png",
        alt: "Tênis",
        className: "right-[5%] bottom-[5%] w-[90px] md:w-[130px]",
        delay: 0.8,
        duration: 4.4,
      },
    ],
    [],
  );

  const avatars = [
    "/testimonial-1.jpg",
    "/testimonial-2.jpg",
    "/testimonial-3.jpg",
    "/testimonial-4.jpg",
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-[#f0eeea]" data-testid="section-hero">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grain opacity-10" />
      </div>
      {/* Floating Background Items - Rendered first with z-0 */}
      {items.map((it, idx) => (
        <motion.img
          key={idx}
          src={it.src}
          alt={it.alt}
          className={cn("pointer-events-none absolute z-0 select-none", it.className)}
          style={{ transform: `translate3d(0, ${y}px, 0)` }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="container-px mx-auto max-w-[1100px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">catálogo com</span>
          <h1 className="text-[clamp(4rem,16vw,7.2rem)] leading-[0.85] tracking-tighter text-center font-['Playfair_Display'] font-bold">
            <span className="text-[#C2452D]">140 looks</span>
            <br />
            <span className="text-[#333]">prontos</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl font-medium leading-tight max-w-[360px] text-[#746f6a]">
            O guia prático para você <span className="text-black font-bold underline decoration-[#C2452D]">copiar</span> ou se <span className="text-black font-bold underline decoration-[#C2452D]">inspirar</span> e estar <span className="text-black font-bold">bem vestida</span> todos os dias.
          </p>

          <p className="md:text-base font-medium text-black/50 text-[18px] mt-[10px] mb-[10px] max-w-[420px] mx-auto">
            Sem comprar roupa nova, sem perder tempo e usando apenas <span className="font-bold text-[#C2452D] border-b-2 border-[#C2452D]">18 peças básicas!</span>
          </p>

          <div className="mt-10 w-full max-w-[480px]">
            <div className="aspect-[9/16] bg-[#1A1A1A] rounded-2xl shadow-2xl relative overflow-hidden group border-4 border-white/10">
              <iframe
                id="hero-video-iframe"
                src="https://www.youtube.com/embed/HyoTGK7muW8?autoplay=1&mute=1&controls=0&loop=1&playlist=HyoTGK7muW8&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&enablejsapi=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full pointer-events-none"
              ></iframe>
              
              <div id="video-overlay" className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                <Button 
                  onClick={() => {
                    const iframe = document.getElementById('hero-video-iframe') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                      iframe.style.pointerEvents = 'auto';
                      const overlay = document.getElementById('video-overlay');
                      if (overlay) overlay.style.display = 'none';
                    }
                  }}
                  className="bg-white/90 hover:bg-white text-black font-bold rounded-full px-6 py-6 shadow-2xl flex items-center gap-2 transform transition-transform hover:scale-110 active:scale-95"
                >
                  <PlayCircle className="w-6 h-6 text-[#C2452D]" />
                  <span>ATIVAR SOM</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex -space-x-2">
              {avatars.map((url, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F5F1E9] bg-gray-300 overflow-hidden">
                  <img src={url} alt={`User ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/30">Satisfação Garantida</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistDores() {
  const items = [
    { emoji: "💰", text: <>Gasta <b>MUITO DINHEIRO</b> em roupas que ficam encostadas no armário?</> },
    { emoji: "🤳", text: <>Se sente <b>INVISÍVEL</b> usando sempre as mesmas combinações?</> },
    { emoji: "🪞", text: <>Sua <b>AUTOESTIMA CAI</b> quando se olha no espelho?</> },
    { emoji: "⏰", text: <>Já ficou <b>HORAS</b> para escolher uma roupa que no final não gostou?</> },
  ];

  return (
    <Section id="dores" bg="cream" className="py-24 overflow-hidden relative">
      <img src="/calca_flutuante.png" className="absolute -left-10 md:-left-32 top-0 w-40 pointer-events-none z-0" />
      <img src="/bolsa_flutuante.png" className="absolute -right-10 md:-right-24 bottom-0 w-48 pointer-events-none z-0" />

      <div className="mx-auto max-w-[600px] px-4 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <Badge className="bg-[#C2452D] text-white border-none px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase font-black mb-4">Identificação</Badge>
          <h2 className="text-3xl md:text-4xl font-black leading-tight uppercase tracking-tighter text-center text-black">
            Teste para você saber se o catálogo <br />
            <span className="text-[#C2452D] italic underline decoration-4 underline-offset-8">foi feito para você:</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 max-w-[420px] mx-auto relative z-10">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-2xl shrink-0">{it.emoji}</span>
              <p className="text-base font-bold tracking-tight text-black/80 leading-snug">
                {it.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DeliverableCard({
  badge,
  image,
  video,
  title,
  description,
  testId,
  variant = "dark",
}: {
  badge?: string;
  image?: string;
  video?: string;
  title: string;
  description: string;
  testId: string;
  variant?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.8, 1, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "relative rounded-xl shadow-xl flex flex-col md:flex-row items-center overflow-visible transition-all duration-300",
        variant === "dark" ? "bg-black text-white" : "bg-white text-black"
      )}
      data-testid={testId}
    >
      <div className="relative w-full md:w-[200px] shrink-0 p-4 md:p-0">
        <div className="relative z-10 md:-ml-8 md:-mt-4 md:-mb-4">
          {video ? (
            <motion.div
              style={{ scale }}
              className={cn(
                "w-full h-auto drop-shadow-2xl mx-auto origin-center md:origin-left flex justify-center",
                "max-w-[120px]"
              )}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-xl shadow-2xl"
              >
                <source src={video} type="video/mp4" />
              </video>
            </motion.div>
          ) : (
            <motion.img
              src={image}
              alt={title}
              style={{ scale }}
              className={cn(
                "w-full h-auto drop-shadow-2xl mx-auto origin-center md:origin-left",
                title.includes("Aplicativo") ? "max-w-[120px]" : "max-w-[180px] rounded-lg"
              )}
              loading="lazy"
            />
          )}
          {badge && (
            <motion.div 
              style={{ scale }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 rounded-full w-16 h-16 flex items-center justify-center text-[8px] font-black uppercase text-white shadow-xl rotate-[-12deg] text-center p-2 leading-tight border-2 border-white/20 bg-[#C2452D]"
            >
              {badge}
            </motion.div>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 flex-1 text-left">
        <h3 className="font-black uppercase tracking-tight mb-2 text-[24px]">{title}</h3>
        <p className="opacity-70 font-medium text-[18px]">{description}</p>
      </div>
    </motion.div>
  );
}

function Entregaveis() {
  return (
    <Section id="entregaveis" bg="cream" className="pb-20">
      <div className="mx-auto max-w-[800px]">
        <h2 className="text-center text-xl font-black uppercase tracking-tighter mb-12">
          TUDO O QUE VOCÊ VAI RECEBER:
        </h2>

        <div className="flex flex-col gap-10">
          <DeliverableCard
            variant="light"
            image="/capa-catalogo.png"
            title="Catálogo de 140 looks"
            description="Looks prontos, é só escolher o número e se vestir, para acessar direto no seu whatsapp."
            testId="card-entregavel-catalogo"
          />
          <DeliverableCard
            variant="dark"
            badge="Bônus 1"
            video="/video-app-web_1770479010004.mp4"
            title="Aplicativo 140 looks"
            description="Praticidade no dia a dia. Você também vai receber acesso a um aplicativo com os looks do seu guia. Super simples de acessar."
            testId="card-entregavel-app"
          />
          <DeliverableCard
            variant="dark"
            badge="Bônus 2"
            image="/capa-ebook-acessorios.png"
            title="Catálogo Acessórios"
            description="Combinações de acessórios para dar aquele up no seu look. Às vezes, o que falta é um detalhe. Acessórios que elevam seu look."
            testId="card-entregavel-acessorios"
          />
        </div>
      </div>
    </Section>
  );
}

function OfertaFinal() {
  return (
    <Section bg="cream" className="pb-20">
      <div className="mx-auto max-w-[540px] rounded-3xl bg-[#D4E9DA] p-8 md:p-12 text-center border border-white/40 shadow-sm">
        <p className="text-white font-black text-[10px] tracking-[0.2em] uppercase mb-6 drop-shadow-md">Condição especial HOJE</p>
        <div className="text-black/30 line-through font-bold text-[18px]">de R$ 97,00</div>
        <div className="text-black/70 text-lg font-black mt-1">por apenas R$ 37,00 ou</div>
        <div className="font-black text-black mt-2 tracking-tighter text-[42px]">5x de R$ 8,19</div>
        <p className="text-black/30 text-[10px] mt-4 font-black uppercase tracking-widest">(mais barato que uma blusinha)</p>
        
        <Button 
          className="mt-10 w-full h-16 rounded-xl bg-[#39C55E] hover:bg-[#2EB051] text-white font-black shadow-2xl transition-transform hover:scale-[1.02] uppercase tracking-tight text-[18px]"
          onClick={() => window.open("https://go.hotmart.com/C99586077J", "_blank")}
        >
          Acesso imediato e vitalício
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-black/40">
          <Check className="w-4 h-4 text-[#39C55E]" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Compra 100% Segura e Protegida</span>
        </div>
      </div>
    </Section>
  );
}

function Depoimentos() {
  const testimonials = [
    {
      name: "Luiza Fontes",
      age: "32 anos",
      role: "Advogada",
      avatar: "/testimonial-1.jpg",
      text: "Amei o material! Descobri que já tinha quase tudo no meu armário. Me destravou mentalmente, é tudo muito prático e rápido de acessar.",
    },
    {
      name: "Monique C.",
      age: "28 anos",
      role: "Empresária",
      avatar: "/testimonial-2.jpg",
      text: "Os looks são lindos e super versáteis. Material para todas as idades, já mandei até para minha mãe e tias. Simplesmente amei!",
    },
    {
      name: "Marcela",
      age: "35 anos",
      role: "Arquiteta",
      avatar: "/testimonial-3.jpg",
      text: "Conteúdo direto e objetivo. Combinações fáceis de entender, do casual ao chique. Tudo muito bem pensado e prático!",
    },
    {
      name: "Rebeca",
      age: "30 anos",
      role: "Psicóloga",
      avatar: "/testimonial-4.jpg",
      text: "Super prático e direto ao ponto. As sugestões de look são fáceis de aplicar e realmente otimizam o que a gente já tem. Vale muito a pena!",
    },
    {
      name: "Flávia Benuzzi",
      age: "41 anos",
      role: "Médica",
      avatar: "/testimonial-5.jpg",
      text: "Estou apaixonada pelo eBook! Nunca imaginei que dava para criar tantos looks incríveis com peças básicas. Me sentindo muito mais confiante!",
    },
    {
      name: "Ana Paula",
      age: "37 anos",
      role: "Designer",
      avatar: "/testimonial-6.jpg",
      text: "O catálogo é maravilhoso! As combinações são super elegantes e fáceis de reproduzir. Facilitou muito a minha rotina.",
    },
    {
      name: "Carla Silveira",
      age: "45 anos",
      role: "Professora",
      avatar: "/testimonial-7.jpg",
      text: "Excelente investimento. O guia é prático e as fotos são ótimas referências. Recomendo para todas as minhas amigas!",
    },
  ];

  // Double the testimonials for infinite scroll effect
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <Section bg="cream" className="pb-24 overflow-hidden pt-12">
      <div className="relative">
        <div className="flex gap-6 animate-infinite-scroll hover:pause-animation">
          {extendedTestimonials.map((t, i) => (
            <div
              key={i}
              className="w-[280px] md:w-[320px] bg-white rounded-2xl shadow-xl border border-black/5 flex flex-col overflow-hidden transform transition-transform hover:scale-[1.02] shrink-0"
            >
              <div className="bg-[#f0f2f5] px-4 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#1c1e21]">{t.name}</span>
                      <div className="w-3 h-3 bg-[#0095F6] rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white stroke-[4]" />
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold text-black/40 uppercase tracking-tighter">
                      {t.age} • {t.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 relative">
                <div className="absolute top-2 right-4 opacity-[0.03]">
                   <PlayCircle className="w-12 h-12 rotate-12" />
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-black/70 font-medium relative z-10 italic">
                  "{t.text}"
                </p>
                <div className="mt-4 flex justify-end">
                   <span className="text-[10px] text-black/20 font-bold">15:{40 + (i % 20)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infinite-scroll 60s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="garantia" bg="cream" className="py-24 text-center">
      <div className="mx-auto max-w-[600px]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          whileInView={{ scale: 1, opacity: 1 }} 
          viewport={{ once: true }}
          className="mb-12 mx-auto w-64 h-64 relative flex items-center justify-center"
        >
          <img 
            src={garantia} 
            alt="Garantia Incondicional 07 Dias" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        <div className="space-y-4">
          <h3 className="text-[#1A3A32] font-black md:text-lg uppercase tracking-tight flex items-center justify-center gap-2 text-[18px]">
            GARANTIA DE 7 DIAS OU SEU DINHEIRO DE VOLTA!
          </h3>
          <p className="text-sm md:text-base leading-relaxed font-medium max-w-[500px] mx-auto uppercase text-[#297558]">
            Eu quero mesmo é que você entre, veja tudo e tire suas próprias conclusões. <span className="font-bold">SE NÃO GOSTAR, DEVOLVEMOS SEU DINHEIRO.</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#C2452D] pt-20 pb-0 text-center relative overflow-hidden flex flex-col min-h-[700px] justify-between">
      <div className="relative z-10 w-full px-0">
        <div className="max-w-[600px] mx-auto px-4 mb-12">
          <Badge className="bg-white/10 text-white border-none px-4 py-1 text-[10px] tracking-[0.3em] uppercase">Sobre Mim</Badge>
        </div>
        
        <div className="relative mt-auto flex flex-col items-center">
          <div className="relative w-full max-w-full md:max-w-[500px] mx-auto">
            <img 
              src="/suelen-footer-v3.png" 
              alt="Suelen Lungov" 
              className="w-full h-auto block mx-auto relative z-0"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white pointer-events-none">
              <div className="max-w-[440px] px-6 text-left w-full mb-0 pointer-events-auto">
                <h4 className="text-xl md:text-2xl font-black mb-1 leading-tight tracking-tighter text-white">
                  Prazer, eu sou a Suelen Lungov.
                </h4>
                <p className="md:text-sm text-white/90 font-medium text-[16px]">
                  Especialista em moda feminina. Minha missão é mostrar que se vestir bem não é sobre ter mais roupas, mas sim sobre saber o que realmente combina com você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/20 py-6 text-white/30 text-[9px] uppercase tracking-[0.3em] font-bold relative z-20 w-full mt-auto">
        Copyright © - Todos os direitos reservados.
      </div>
    </footer>
  );
}

function StickyMiniNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!scrolled) return null;

  return (
    <motion.div initial={{ y: -60 }} animate={{ y: 0 }} className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md shadow-sm h-14">
      <div className="container-px mx-auto flex items-center justify-between h-full max-w-[1100px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#C2452D] flex items-center justify-center text-white">
            <Grid3X3 className="w-5 h-5" />
          </div>
          <span className="text-sm font-black tracking-tighter uppercase">140 Looks</span>
        </div>
        <Button size="sm" className="rounded-full bg-[#C2452D] text-white px-6 font-bold text-xs" onClick={() => window.open("https://go.hotmart.com/C99586077J", "_blank")}>Quero Agora</Button>
      </div>
    </motion.div>
  );
}

export default function Catalogo140LooksPage() {
  return (
    <div className="min-h-screen w-full bg-[#F5F1E9] font-sora selection:bg-[#C2452D] selection:text-white overflow-x-hidden">
      <Hero />
      <ChecklistDores />
      <Entregaveis />
      <OfertaFinal />
      <Depoimentos />
      <FAQ />
      <Footer />
      
      <a href="#" className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#C2452D] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <Sparkles className="w-5 h-5" />
      </a>
    </div>
  );
}
