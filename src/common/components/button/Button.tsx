import { FC } from 'react';
import styled from 'styled-components';
import { Button as PButton, Avatar, BaseStyles, ActionMenu, ActionList,  } from '@primer/react';

const fieldTypes = [
    {icon: TypographyIcon, name: 'Text'},
    {icon: NumberIcon, name: 'Number'},
    {icon: CalendarIcon, name: 'Date'},
    {icon: SingleSelectIcon, name: 'Single select'},
    {icon: IterationsIcon, name: 'Iteration'}
  ]

export const Button: FC = ({ children }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1)
    const selectedType = fieldTypes[selectedIndex]
  
    return (
        <BaseStyles>
        <ActionMenu>
            <ActionMenu.Button aria-label="Select field type" leadingIcon={selectedType.icon}>
                {selectedType.name}
            </ActionMenu.Button>
            <ActionMenu.Overlay width="medium">
                <ActionList selectionVariant="single">
                {fieldTypes.map((type, index) => (
                    <ActionList.Item key={index} selected={index === selectedIndex} onSelect={() => setSelectedIndex(index)}>
                    <ActionList.LeadingVisual>
                        <type.icon />
                    </ActionList.LeadingVisual>
                    {type.name}
                    </ActionList.Item>
                ))}
                </ActionList>
            </ActionMenu.Overlay>
        </ActionMenu>

            {/* <PButton>{children}</PButton>
            <Avatar src="https://img.helgesson.dev/me.png" /> */}
        </BaseStyles>
    );
};
