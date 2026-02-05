import {
  Body,
  Button,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import {
  ContentWrapper,
  Footer,
  RootWrapper,
} from '~/services/mail/templates/components';

interface WelcomeTemplateProps {
  email: string;
  link: string;
}

export const Welcome = ({ email, link }: WelcomeTemplateProps) => (
  <Html>
    <RootWrapper>
      <Head />
      <Preview>Bienvenido a Lizz Dress!</Preview>
      <Body className="bg-white">
        <ContentWrapper>
          <Heading className="text-gray-900 text-center font-bold m-auto text-xl md:text-2xl">
            Bienvenido a Lizz Dress!
          </Heading>
          <Section className="py-6 mx-auto font-bold text-center text-gray-900 text-base">
            {email}
          </Section>
          <Text className="text-gray-600 text-center text-sm !mt-0">
            Estamos emocionados de tenerte a bordo! 🚀 Convierte tus bases de
            datos en tablas inteligentes poderosas y administra tus datos como
            quieras.
          </Text>
          <Text className="text-gray-600 text-center text-sm !mt-0">
            Comienza creando tu primer proyecto o explorando plantillas para ver
            lo que es posible.
          </Text>
          <Text className="text-gray-600 text-center text-sm !mt-0 !mb-6">
            ¡Construyamos algo increíble juntos! 💡
          </Text>
          <Button
            className="text-center w-full text-base font-bold bg-brand-500 text-white rounded-lg h-10"
            href={link}
          >
            <Text className="!my-[8px]">Ir a tu Espacio de Trabajo</Text>
          </Button>
        </ContentWrapper>
        <Footer />
      </Body>
    </RootWrapper>
  </Html>
);

Welcome.PreviewProps = {
  email: 'janedoe@nocodb.com',
  link: 'https://nocodb.com',
};

export default Welcome;
