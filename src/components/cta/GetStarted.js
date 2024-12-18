import React, { useState } from "react";
import emailjs from "emailjs-com";
import DatePicker from "react-datepicker"; // Ensure you have this package installed
import styled from "styled-components"; //eslint-disable-line
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "components/misc/Layouts";

const PrimaryBackgroundContainer = tw.div`py-20 lg:py-24 bg-primary-500 rounded-lg relative`;
const Row = tw.div`px-8 max-w-screen-lg mx-auto flex items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`;
const TextContainer = tw(ColumnContainer)``;
const Text = tw.h5`text-gray-100 text-2xl sm:text-3xl font-bold`;

const LinksContainer = tw(
  ColumnContainer
)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;

const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded-full font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;
const PrimaryLink = tw(
  Link
)`cursor-pointer bg-red-500 text-gray-100 shadow-lg hocus:bg-red-600 hocus:text-gray-200`;

const SecondaryLink = tw(
  Link
)`cursor-pointer text-gray-100 border-gray-500 hover:bg-gray-100 hover:text-primary-500 hover:border-primary-500`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-700 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-700 opacity-50`;
export default ({
  text = "Compartenos tus problemas, nosotros nos encargamos de las soluciones.",
  primaryLinkText = "Ver planes",
  primaryLinkUrl = "http://timerse.com",
  secondaryLinkText = "Contáctanos",
  secondaryLinkUrl = "http://google.com",
  pushDownFooter = true,
}) => {
  const ContactModal = ({ isOpen, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [meetingTitle, setMeetingTitle] = useState("");
    if (!isOpen) return null;
    const handleSubmit = (e) => {
      e.preventDefault();

      if (!fullName || !email || !meetingTitle || !selectedDate) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      // Generate a unique Jitsi meeting link
      const roomId = `${meetingTitle.replace(/\s+/g, "_")}_${Date.now()}`;
      const meetingLink = `https://meet.jit.si/${roomId}`;

      const templateParams = {
        fullName,
        email,
        meetingTitle,
        schedule: selectedDate.toLocaleString(),
        meetingLink, // Include the Jitsi meeting link
      };

      emailjs
        .send(
          "service_8hklyms", // Replace with your EmailJS Service ID
          "template_4sgk9c5", // Replace with your EmailJS Template ID
          templateParams,
          "Q_l2VfGe9wtyaytF7" // Replace with your Public Key
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
            alert("El correo ha sido enviado con los detalles de la reunión.");
            onClose();
          },
          (err) => {
            console.error("FAILED...", err);
            alert("Ocurrió un error al enviar el correo.");
          }
        );
    };

    return (
      <div
        css={tw`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div css={tw`bg-white p-8 rounded-lg z-50 w-full max-w-3xl`}>
          <form onSubmit={handleSubmit} css={tw`space-y-4`}>
            <div>
              <h2 css={tw`text-center mt-8 mb-2 text-xl font-bold`}>
                Agenda una reunión para contactarnos.
              </h2>
              <p css={tw`text-center`}>
                Te estaremos enviando un mensaje de correo electrónico con los
                detalles.
              </p>
            </div>

            <div>
              <label
                htmlFor="fullName"
                css={tw`block text-sm font-medium mb-1`}
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Escribe tu nombre completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" css={tw`block text-sm font-medium mb-1`}>
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Escribe tu correo electrónico"
                required
              />
            </div>

            <div>
              <label
                htmlFor="messageTitle"
                css={tw`block text-sm font-medium mb-1`}
              >
                Título de reunión
              </label>
              <input
                type="text"
                id="messageTitle"
                name="messageTitle"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Escribe un título"
                required
              />
            </div>

            <div>
              <label
                htmlFor="schedule"
                css={tw`block text-sm font-medium mb-1`}
              >
                Hora y fecha
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholderText="Selecciona hora y fecha"
                required
              />
            </div>

            <button
              type="submit"
              css={tw`w-full bg-blue-500 text-white py-3 rounded mt-4`}
            >
              Agendar
            </button>
          </form>

          <button onClick={onClose} css={tw`mt-4 text-blue-500`}>
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`}>
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              <Text>{text}</Text>
            </TextContainer>
            <LinksContainer>
              <PrimaryLink
                onClick={() => {
                  let element = document.getElementById("IdPrecioss"); // Replace with your element's ID
                  let yCoordinate =
                    element.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: yCoordinate,
                    behavior: "smooth",
                  });
                }}
              >
                {primaryLinkText}
              </PrimaryLink>
              <SecondaryLink onClick={handleModalOpen}>
                {secondaryLinkText}
              </SecondaryLink>
              <ContactModal isOpen={isModalOpen} onClose={handleModalClose} />
            </LinksContainer>
          </Row>
          <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer>
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
