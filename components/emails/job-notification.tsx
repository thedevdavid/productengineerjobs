/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface JobNotificationEmailProps {
  name: string;
  newJobs: {
    position: string;
    company: string;
    salary: string;
    url: string;
  }[];
}

const ContactUsEmail = ({ name, newJobs }: JobNotificationEmailProps) => {
  const previewText = `Hey ${name}, new jobs for you!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Hey {name}, new jobs for you!
            </Heading>

            <Section>
              {newJobs.map((job) => (
                <>
                  <Row key={job.url}>
                    <Column align="left">
                      <Text className="text-[14px] font-bold leading-[24px] text-black">{job.position}</Text>
                      <Text className="text-[14px] font-bold leading-[24px] text-black">{job.company}</Text>
                    </Column>
                    <Column align="right">
                      <Text className="text-[14px] font-bold leading-[24px] text-black">{job.salary}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column align="center">
                      <Link className="text-[14px] font-bold leading-[24px] text-black" href={job.url}>
                        View & apply
                      </Link>
                    </Column>
                  </Row>
                </>
              ))}
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This message was sent to <strong>{name}</strong> from <strong>ProductEngineerJobs</strong>. Reply
              "unsubscribe" if you don't want to receive these emails anymore.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactUsEmail;
