import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import Features from "components/features/ThreeColWithSideImage.js";
import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import Pricing from "components/pricing/ThreePlans.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.js";
import GetStarted from "components/cta/GetStarted";
import Footer from "components/footers/FiveColumnWithBackground.js";
import heroScreenshotImageSrc from "images/hero-screenshot-1.png";
import macHeroScreenshotImageSrc from "images/hero-screenshot-2.png";
import prototypeIllustrationImageSrc from "images/prototype-illustration.svg";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
  const HighlightedText = tw.span`text-primary-500`;

  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
      <Features
        subheading={<Subheading>Nuestras Soluciones</Subheading>}
        heading={
          <>
            Ofrecemos un Servicio{" "}
            <HighlightedText>Excepcional.</HighlightedText>
          </>
        }
      />
      <MainFeature
        subheading={<Subheading>TRABAJO DE CALIDAD</Subheading>}
        imageSrc={heroScreenshotImageSrc}
        imageBorder={true}
        imageDecoratorBlob={true}
      />
      <FeatureWithSteps
        subheading={<Subheading>PASOS A SEGUIR</Subheading>}
        heading={
          <>
            Solicita tu <HighlightedText>Producto.</HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={macHeroScreenshotImageSrc}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
      />
      <MainFeature2
        subheading={<Subheading id="IdValoress">VALORES</Subheading>}
        heading={
          <>
            Siempre nos regimos por nuestros{" "}
            <HighlightedText>Principios.</HighlightedText>
          </>
        }
        imageSrc={prototypeIllustrationImageSrc}
        showDecoratorBlob={false}
        description="En EncioSystems, nos mantenemos firmes en nuestros principios fundamentales, brindando soluciones basadas en la ética, la calidad y el compromiso. Nos esforzamos por ofrecer lo mejor a nuestros clientes en cada proyecto."
        features={[
          {
            Icon: MoneyIcon,
            title: "Accesible",
            description:
              "Nos comprometemos a ofrecerte la mejor tarifa posible, acorde a los estándares de la industria.",
            iconContainerCss: tw`bg-green-300 text-green-800`,
          },
          {
            Icon: BriefcaseIcon,
            title: "Profesionalismo",
            description:
              "Te aseguramos que nuestros productos son diseñados y creados por profesionales con gran experiencia en el campo.",
            iconContainerCss: tw`bg-red-300 text-red-800`,
          },
        ]}
      />
      <Pricing
        subheading={<Subheading>Precios</Subheading>}
        heading={
          <>
            Planes Asequibles y <HighlightedText>Flexibles.</HighlightedText>
          </>
        }
        description="En EncioSystems ofrecemos soluciones personalizadas que se adaptan a las necesidades de tu proyecto. Nuestros planes están diseñados para cubrir desde pequeños proyectos hasta grandes empresas."
        plans={[
          {
            name: "Web Estática",
            price: "$89.99",
            duration: "Único pago",
            mainFeature: "Ideal para proyectos individuales.",
            features: [
              "Pagina Web de Presentacion Estática",
              "Multiples Plantillas y opciones ",
              "Revisiones ilimitadas",
              "2 Meses de cobertura contra incidentes",
            ],
          },
          {
            name: "Sistema Web",
            price: "$124.99",
            duration: "Único pago",
            mainFeature: "Ideal para empresas buscando soluciones Web o Móvil.",
            features: [
              "Sistemas de Control de inventario",
              "Sistemas de Facturación",
              "Apliaciones moviles reflejando sistemas web",
              "Aplicaciones de escritorio",
            ],
            featured: true,
          },
          {
            name: "Soluciones Empresariales",
            price: "+$249.99",
            duration: "Único pago",
            mainFeature: "Soluciones avanzadas para grandes empresas.",
            features: [
              "Soluciones para proyectos complejos",
              "Diseño y modelado de datos",
              "Consultoría de Software",
              "Mantenimiento a Sistemas implementados",
            ],
          },
        ]}
      />
      <Testimonial
        subheading={<Subheading id="IdTestimonios">Testimonios</Subheading>}
        heading={
          <>
            Nuestros Clientes Nos <HighlightedText>Aman.</HighlightedText>
          </>
        }
        description="En EncioSystems, nos enorgullecemos de ofrecer soluciones de calidad que superan las expectativas. Nuestros clientes confían en nosotros para llevar sus ideas al siguiente nivel."
        testimonials={[
          {
            stars: 5,
            profileImageSrc: "https://enciosystems.com/img/montilla.png",
            heading: "Excelente diseño!.",
            quote:
              "Impecable trabajo, me siento agusto con el entregable de parte de EncioSystems, sin duda me ayuda en gran medida a impulsar mi negocio.",
            customerName: "Ramón Montilla",
            customerTitle: "Agente de bienes raíces",
          },
          {
            stars: 5,
            profileImageSrc:
              "https://enciosystems.com/img/opiniinversiones.png",
            heading: "Complacido con el soporte y seguimiento.",
            quote:
              "EncioSystems ha demostrado un compromiso excepcional con el soporte y el seguimiento de mi proyecto. Cada vez que he tenido una consulta o requerimiento, han respondido de manera rápida y efectiva. Saber que cuento con su respaldo me da una gran tranquilidad. Altamente recomendado por su profesionalismo y atención al cliente.",
            customerName: "Sarito De La Cruz",
            customerTitle: "OPINI Inversiones",
          },
        ]}
      />
      <FAQ
        subheading={<Subheading>DUDAS</Subheading>}
        heading={
          <>
            Tienes <HighlightedText>Preguntas ?</HighlightedText>
          </>
        }
        description="Nosotros tenemos respuestas para todas ellas."
        faqs={[
          {
            question: "Que pasa si quiero cambiarle algo a mi pagina web ?",
            answer:
              "La satisfacción de los clientes es esencial para nosotros, en caso de no estar conforme ofrecemos una semana extra para revisiones y modificaciones exclusivamente para casos esfecíficos.",
          },
          {
            question: "Como veo mi Web despues que es desarrollada ?",
            answer:
              "Para poder visualizar un sitio web desde cualquier dispositivo, es necesario comprar un dominio y contratar un servicio de Hosting para alojar el sitio web.",
          },
          {
            question: "Como puedo contratar un servico de Hosting ?",
            answer:
              "Ofrecemos asesoría gratuita para recomendarte el servicio de Host mas adecuado para tu proyecto y presupuesto.",
          },
          {
            question: "Como procede el mantenimiento de mi Web/Sistema ?",
            answer:
              "Para una Web Estática, ofrecemos hasta 2 modificaciones por mes a un precio de $9.99. Para Sistemas Web y Apps Moviles las modificaciones se obtienen desde $24.99 dependiendo el requerimiento. En el caso de Soluciones Empresariales avanzadas, se cobraría por incidente o solicitud de mejora, el precio va a depender de las horas de trabajo invertidas.",
          },
          /*{
            question: "Are the templates compatible with the React ?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            question: "Do you really support Internet Explorer 11 ?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },*/
        ]}
      />
      <GetStarted />
      <Footer />
    </AnimationRevealPage>
  );
};
