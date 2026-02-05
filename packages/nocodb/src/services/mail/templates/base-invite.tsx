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

interface BaseInviteTemplateProps {
  baseTitle: string;
  name: string;
  email: string;
  link: string;
}

export const BaseInvite = ({
  baseTitle,
  name,
  email,
  link,
}: BaseInviteTemplateProps) => (
  <Html>
    <RootWrapper>
      <Head />
      <Preview>Te has invitado a una Base</Preview>
      <Body className="bg-white">
        <ContentWrapper>
          <Heading className="text-gray-900 text-center font-bold m-auto text-xl md:text-2xl">
            Te has invitado a una Base
          </Heading>
          <Section className="py-6 mx-auto font-bold mx-auto text-center text-gray-900 text-base">
            {baseTitle}
          </Section>
          <Text className="text-gray-600 text-center text-sm !mt-0 !mb-6">
            <span className="font-bold text-gray-800">{name}</span> ({email}) te
            ha invitado a colaborar en{' '}
            <span className="font-bold text-gray-800">{baseTitle}</span> base.
          </Text>
          <Button
            className="text-center w-full text-base font-bold bg-brand-500 text-white rounded-lg h-10"
            href={link}
          >
            <Text className="!my-[8px]">Aceptar Invitación de Base</Text>
          </Button>
        </ContentWrapper>
        <Footer />
      </Body>
    </RootWrapper>
  </Html>
);

BaseInvite.PreviewProps = {
  baseTitle: 'Nombre de la Base',
  name: 'Nombre del Invitado',
  email: 'invitado@example.com',
  link: 'https://app.lizzdress.com',
};

export default BaseInvite;
