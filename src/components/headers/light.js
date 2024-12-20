import React, { useState } from "react";
import emailjs from "emailjs-com";
import DatePicker from "react-datepicker"; // Ensure you have this package installed
import "react-datepicker/dist/react-datepicker.css"; // Include the styles for the date picker
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  cursor-pointer
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-24 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */
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
  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink id="inicioNavOpton" href="/#">
        Inicio
      </NavLink>
      <NavLink
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
        Precios
      </NavLink>
      <NavLink
        onClick={() => {
          let element = document.getElementById("IdValoress"); // Replace with your element's ID
          let yCoordinate =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: yCoordinate,
            behavior: "smooth",
          });
        }}
      >
        Valores
      </NavLink>
      <NavLink
        onClick={() => {
          let element = document.getElementById("IdTestimonios"); // Replace with your element's ID
          let yCoordinate =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: yCoordinate,
            behavior: "smooth",
          });
        }}
      >
        Opiniones
      </NavLink>
      <PrimaryLink
        css={roundedHeaderButton && tw`rounded-full`}
        onClick={handleModalOpen}
      >
        Contáctanos
      </PrimaryLink>
      <ContactModal isOpen={isModalOpen} onClose={handleModalClose} />
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" width={"500px"} />
      EncioSystems
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
