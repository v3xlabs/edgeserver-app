import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
    title: 'Signal/Button',
    component: Button,
    argTypes: {
        label: {
            type: 'string',
            defaultValue: 'Click me'
        },
        variant: {
            options: ['primary', 'secondary'],
            control: { type: 'radio' },
            defaultValue: 'primary'
        }
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {};
