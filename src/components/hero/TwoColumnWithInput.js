import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import DatePicker from "react-datepicker"; // Ensure you have this package installed
import "react-datepicker/dist/react-datepicker.css"; // Include the styles for the date picker

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;

export default ({ roundedHeaderButton }) => {
  const ContactModal = ({ isOpen, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    if (!isOpen) return null;

    return (
      <div
        css={tw`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div css={tw`bg-white p-8 rounded-lg z-50 w-full max-w-3xl`}>
          <form css={tw`space-y-4`}>
            <div>
              <h2
                style={{
                  textAlign: "center",
                  marginTop: "2rem",
                  fontSize: "30px",
                }}
              >
                Agenda una reunion para contactarnos.
              </h2>
              <br />
              <br />
              <label
                htmlFor="fullName"
                css={tw`block text-sm font-medium mb-1`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" css={tw`block text-sm font-medium mb-1`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Enter your email"
                value={
                  document.getElementById("sceduleEmailTextField").value ===
                    null ||
                  document.getElementById("sceduleEmailTextField").value ===
                    undefined ||
                  document.getElementById("sceduleEmailTextField").value === ""
                    ? " "
                    : document.getElementById("sceduleEmailTextField").value
                }
              />
            </div>

            <div>
              <label
                htmlFor="messageTitle"
                css={tw`block text-sm font-medium mb-1`}
              >
                Message Title
              </label>
              <input
                type="text"
                id="messageTitle"
                name="messageTitle"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Enter the message title"
              />
            </div>
            <div>
              <label
                htmlFor="schedule"
                css={tw`block text-sm font-medium mb-1`}
              >
                Schedule a Meeting
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholderText="Select a date and time"
              />
            </div>

            <button
              type="submit"
              css={tw`w-full bg-blue-500 text-white py-3 rounded mt-4`}
            >
              Schedule Meeting
            </button>
          </form>
          <button onClick={onClose} css={tw`mt-4 text-blue-500`}>
            Close
          </button>
        </div>
      </div>
    );
  };
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const handleContactModalOpen = () => {
    setContactModalOpen(true);
  };

  const handleContactModalClose = () => setContactModalOpen(false);
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Transformamos tus ideas en
              <span tw="text-primary-500"> soluciones tecnológicas.</span>
            </Heading>
            <Paragraph>
              En EncioSystems, somos expertos en el desarrollo de soluciones
              innovadoras en web, aplicaciones móviles, aplicaciones de
              escritorio, y consultoría de software.
            </Paragraph>
            {
              <Actions>
                <input
                  id="sceduleEmailTextField"
                  type="text"
                  placeholder="Inserta tu correo electrónico"
                />
                <button
                  onClick={() => {
                    handleContactModalOpen();
                  }}
                >
                  Contáctanos
                </button>
              </Actions>
            }
            <CustomersLogoStrip>
              <p>Nuestros clientes de confianza</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src={DesignIllustration}
                alt="Design Illustration"
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <ContactModal
          id={"contanctScheduleModal"}
          isOpen={isContactModalOpen}
          onClose={handleContactModalClose}
        />
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
