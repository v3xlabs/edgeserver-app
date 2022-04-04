import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './Card';

export default {
    title: 'Signal/Card',
    component: Card,
    argTypes: {
        padding: {
            type: 'boolean'
        },
        width: {
            type: 'string',
            removeIf: ''
        }
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
    <Card {...args} >Hello world this is a piece of text</Card>
);

export const Default = Template.bind({});
Default.args = {};

const Template2: ComponentStory<typeof Card> = (args) => (
    <Card {...args} >
        <ul>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
        </ul>
    </Card>
);

export const List = Template2.bind({});
List.args = {};
