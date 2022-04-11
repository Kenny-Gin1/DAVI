import styled from 'styled-components';

import Avatar from 'components/Guilds/Avatar';
import Editor from 'components/Guilds/Editor';
import { Button } from 'components/Guilds/common/Button';
import { useState } from 'react';

// Move to theme config
const spacing = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512];

const getSpacing = val => spacing[Math.abs(val)] * (val / Math.abs(val)) || 0;

// Define a standard box with helpers for spacing - Many component libraries such as ChakraUI and ThemeUI use this. Tailwind has similar convention.
const Box = styled.div`
  margin: ${({ m = 0 }) => getSpacing(m)}px;
  margin-left: ${({ ml = 0, mx = 0 }) => getSpacing(ml || mx)}px;
  margin-right: ${({ mr = 0, mx = 0 }) => getSpacing(mr || mx)}px;
  margin-top: ${({ my = 0 }) => getSpacing(my)}px;
  margin-bottom: ${({ my = 0 }) => getSpacing(my)}px;
  padding: ${({ p = 0 }) => getSpacing(p)}px;
  padding-left: ${({ pl = 0, px = 0 }) => getSpacing(pl || px)}px;
  padding-right: ${({ pr = 0, px = 0 }) => getSpacing(pr || px)}px;
  padding-top: ${({ py = 0 }) => getSpacing(py)}px;
  padding-bottom: ${({ py = 0 }) => getSpacing(py)}px;
`;
const Text = styled(Box)`
  display: inline;
  color: ${({ theme, color }) => theme.colors[color] || 'inherit'};
`;
const Flex = styled(Box)`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || 'initial'};
  justify-content: ${({ justifyContent }) => justifyContent || 'initial'};
`;
const AvatarBorder = styled.div`
  padding: 8px;
  border-radius ${({ theme }) => theme.radii.rounded};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  margin-right: 8px; // Do we have some kind of spacing config for consistency?
  height: 24px; // Avatar is inline-block which messes up the box
`;
const CommentAs = styled(Flex)`
  height: 42px;
`;

export default function CommentCompose() {
  const [content, setContent] = useState('');
  return (
    <Flex>
      <div>
        <AvatarBorder>
          <Avatar defaultSeed={'parsedData?.destination'} size={24} />
        </AvatarBorder>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('Create post', content);
        }}
      >
        <CommentAs alignItems="center">
          <Text>
            Comment as <Text color="grey">user.eth</Text>
          </Text>
        </CommentAs>
        <Editor
          placeholder="What do you want to propose?"
          onMdChange={setContent}
        />
        {/* Button has margin which is why we negate that here with mr (margin-right) */}
        <Flex justifyContent="flex-end" mr={-2}>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

