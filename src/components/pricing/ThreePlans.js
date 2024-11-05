import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";

const HeaderContainer = tw.div`mt-10 w-full flex flex-col items-center`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const PlansContainer = tw.div`flex justify-between flex-col lg:flex-row items-center lg:items-stretch relative`;
const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 lg:mr-8 lg:last:mr-0 text-center px-8 rounded-lg shadow relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }

  ${(props) =>
    props.featured &&
    css`
      background: rgb(100,21,255);
      background: linear-gradient(135deg, rgba(100,21,255,1) 0%, rgba(128,64,252,1) 100%);
background: rgb(85,60,154);
background: linear-gradient(135deg, rgba(85,60,154,1) 0%, rgba(128,90,213,1) 100%);
background: rgb(76,81,191);
background: linear-gradient(135deg, rgba(76,81,191,1) 0%, rgba(102,126,234,1) 100%);
      ${tw`bg-primary-500 text-gray-100`}
      .planHighlight {
        ${tw`hidden`}
      }
      .duration {
        ${tw`text-gray-200!`}
      }
      ${PlanFeatures} {
        ${tw`border-indigo-500`}
      }
      .feature:not(.mainFeature) {
        ${tw`text-gray-300!`}
      }
      ${BuyNowButton} {
        ${tw`bg-gray-100 text-primary-500 hocus:bg-gray-300 hocus:text-primary-800`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-xl font-bold tracking-wide`}
  }
`;

const PlanAction = tw.div`px-4 sm:px-8 xl:px-16 py-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline`}
`;

const DecoratorBlob = styled(SvgDecoratorBlob)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2`}
`;

export default ({
  subheading = "Pricing",
  heading = "Flexible Plans.",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  plans = null,
  primaryButtonText = "Comprar",
}) => {
  const defaultPlans = [
    {
      name: "Personal",
      price: "$17.99",
      duration: "Monthly",
      mainFeature: "Suited for Personal Blogs",
      features: [
        "30 Templates",
        "7 Landing Pages",
        "12 Internal Pages",
        "Basic Assistance",
      ],
    },
    {
      name: "Business",
      price: "$37.99",
      duration: "Monthly",
      mainFeature: "Suited for Production Websites",
      features: [
        "60 Templates",
        "8 Landing Pages",
        "22 Internal Pages",
        "Priority Assistance",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "$57.99",
      duration: "Monthly",
      mainFeature: "Suited for Big Companies",
      features: [
        "90 Templates",
        "9 Landing Pages",
        "37 Internal Pages",
        "Personal Assistance",
      ],
    },
  ];

  const PaymentModal = ({ isOpen, onClose }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      if (isOpen) {
        if (!isScriptLoaded) {
          const existingScript = document.querySelector(
            'script[src*="paypal.com/sdk/js"]'
          );

          if (!existingScript) {
            const script = document.createElement("script");
            script.src =
              "https://www.paypal.com/sdk/js?client-id=BAAExSNHmsI9rmQDi_BfDtlHXjPaOhAumN7CYfObZ1B6zeXYDSRnjghlYb_TKnQvF8CU-Bm-OYEYRxlPnQ&components=hosted-buttons&disable-funding=venmo&currency=USD";
            script.async = true;
            script.crossOrigin = "anonymous";

            script.onload = () => {
              setIsScriptLoaded(true);
              if (window.paypal) {
                window.paypal
                  .HostedButtons({
                    hostedButtonId: "CCUVWCYUX8SES",
                  })
                  .render("#paypal-container-CCUVWCYUX8SES");
              }
            };

            document.body.appendChild(script);
          } else {
            setIsScriptLoaded(true);
            if (window.paypal) {
              window.paypal
                .HostedButtons({
                  hostedButtonId: "CCUVWCYUX8SES",
                })
                .render("#paypal-container-CCUVWCYUX8SES");
            }
          }
        }
      }
    }, [isOpen, isScriptLoaded]);

    useEffect(() => {
      // Clear the PayPal container if the modal closes to avoid re-initialization issues
      return () => {
        const paypalContainer = document.getElementById(
          "paypal-container-CCUVWCYUX8SES"
        );
        if (paypalContainer) {
          paypalContainer.innerHTML = "";
        }
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div
        css={tw`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div css={tw`bg-white p-6 rounded-lg z-50`}>
          <div id="alerts" css={tw`bg-white p-6 rounded-lg`}>
            <div id="payment_options" css={tw`bg-white p-6 rounded-lg`}>
              <div id="paypal-container-CCUVWCYUX8SES"></div>
            </div>
          </div>
          <button onClick={onClose} css={tw`mt-4 text-blue-500`}>
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div
        css={tw`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div css={tw`bg-white p-8 rounded-lg z-50 w-full max-w-3xl`}>
          <form css={tw`space-y-4`}>
            <div>
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
              <label
                htmlFor="phoneNumber"
                css={tw`block text-sm font-medium mb-1`}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Enter your phone number"
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
              <label htmlFor="message" css={tw`block text-sm font-medium mb-1`}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                css={tw`w-full p-3 border border-gray-300 rounded`}
                placeholder="Enter your message"
                rows="6"
              ></textarea>
            </div>

            <button
              type="submit"
              css={tw`w-full bg-blue-500 text-white py-3 rounded mt-4`}
            >
              Send
            </button>
          </form>
          <button onClick={onClose} css={tw`mt-4 text-blue-500`}>
            Close
          </button>
        </div>
      </div>
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleContactModalOpen = () => {
    setContactModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const handleContactModalClose = () => setContactModalOpen(false);

  const highlightGradientsCss = [
    css`
      background: rgb(56, 178, 172);
      background: linear-gradient(
        115deg,
        rgba(56, 178, 172, 1) 0%,
        rgba(129, 230, 217, 1) 100%
      );
    `,
    css`
      background: rgb(56, 178, 172);
      background-image: linear-gradient(
        115deg,
        #6415ff,
        #7431ff,
        #8244ff,
        #8e56ff,
        #9a66ff
      );
    `,
    css`
      background: rgb(245, 101, 101);
      background: linear-gradient(
        115deg,
        rgba(245, 101, 101, 1) 0%,
        rgba(254, 178, 178, 1) 100%
      );
    `,
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderContainer>
          {subheading && <Subheading id="IdPrecioss">{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description && <Description>{description}</Description>}
        </HeaderContainer>
        <PlansContainer>
          {plans.map((plan, index) => (
            <Plan key={index} featured={plan.featured}>
              {!plan.featured && (
                <div
                  className="planHighlight"
                  css={
                    highlightGradientsCss[index % highlightGradientsCss.length]
                  }
                />
              )}
              <PlanHeader>
                <span className="name">{plan.name}</span>
                <span className="price">{plan.price}</span>
                <span className="duration">{plan.duration}</span>
              </PlanHeader>
              <PlanFeatures>
                <span className="feature mainFeature">{plan.mainFeature}</span>
                {plan.features.map((feature, index) => (
                  <span key={index} className="feature">
                    {feature}
                  </span>
                ))}
              </PlanFeatures>
              <PlanAction>
                <BuyNowButton
                  name={plan.price}
                  onClick={() => {
                    if (plan.name === "Soluciones Empresariales") {
                      handleContactModalOpen();
                    } else {
                      handleModalOpen();
                    }
                  }}
                  css={!plan.featured && highlightGradientsCss[index]}
                >
                  {primaryButtonText}
                </BuyNowButton>
              </PlanAction>
            </Plan>
          ))}

          <PaymentModal
            id={"paymentModal"}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
          <ContactModal
            id={"contactModal"}
            isOpen={isContactModalOpen}
            onClose={handleContactModalClose}
          />
          <DecoratorBlob />
        </PlansContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
