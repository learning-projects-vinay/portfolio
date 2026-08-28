'use client';
import { Fragment } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fonts } from '../../contexts/ThemeContext';

// Matches, in order: a quoted string (optionally a key, i.e. followed by a
// colon), a literal, or a number. Splitting on a capturing group hands back
// alternating punctuation/token pieces, so nothing is dropped.
const TOKEN =
  /("(?:\\.|[^"\\])*"\s*:?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;

const URL_STRING = /^"(https?:\/\/[^"]+)"$/;

type TokenKind = 'key' | 'string' | 'literal' | 'number';

const classify = (token: string): TokenKind => {
  if (token.startsWith('"')) return token.trimEnd().endsWith(':') ? 'key' : 'string';
  if (/^(true|false|null)$/.test(token)) return 'literal';
  return 'number';
};

const JsonView = ({ value }: { value: unknown }) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  const colors: Record<TokenKind | 'punctuation', string> = {
    key: dark ? '#8B96FA' : '#4F46E5',
    string: dark ? '#7DD3A8' : '#047857',
    literal: dark ? '#F0A0C0' : '#BE185D',
    number: dark ? '#E9C46A' : '#B45309',
    punctuation: dark ? 'rgba(163,171,189,0.72)' : 'rgba(87,100,122,0.78)',
  };

  const json = JSON.stringify(value, null, 2);

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        fontFamily: fonts.mono,
        fontSize: { xs: '0.76rem', sm: '0.8rem' },
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: colors.punctuation,
      }}
    >
      {json.split(TOKEN).map((piece, index) => {
        if (index % 2 === 0) return <Fragment key={index}>{piece}</Fragment>;

        const kind = classify(piece);
        const url = kind === 'string' ? piece.match(URL_STRING) : null;

        if (url) {
          return (
            <Box
              key={index}
              component="a"
              href={url[1]}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: colors.string,
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                textUnderlineOffset: '3px',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {piece}
            </Box>
          );
        }

        return (
          <Box key={index} component="span" sx={{ color: colors[kind] }}>
            {piece}
          </Box>
        );
      })}
    </Box>
  );
};

export default JsonView;
