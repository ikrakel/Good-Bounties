import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { useState } from 'react';

interface Option {
  value: number;
  label: string;
  component: React.ReactNode;
}

export const ATabs = ({ options }: { options: Option[] }) => {
  return (
    <Tabs defaultValue={options[0].value}>
      <TabList>
        {options.map((option) => {
          return (
            <Tab key={option.value} value={option.value}>
              {option.label}
            </Tab>
          );
        })}
      </TabList>

      {options.map((option) => {
        return (
          <TabPanel key={option.value} value={option.value}>
            {option.component}
          </TabPanel>
        );
      })}
    </Tabs>
  );
};
