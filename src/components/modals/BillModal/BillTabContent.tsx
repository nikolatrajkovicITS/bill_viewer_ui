import { Box, Typography } from '@mui/material';

import { LANGUAGES, type Language } from '../../../constants';
import type { BillModel } from '../../../types/bill.type';

type BillTabContentProps = {
  bill: BillModel;
  language: Language;
};

export const BillTabContent = ({ bill, language }: BillTabContentProps) => {
  const isEnglish = language === LANGUAGES.ENGLISH;

  const content = {
    shortTitle: isEnglish ? bill.shortTitleEn : bill.shortTitleGa,
    longTitle: isEnglish ? bill.longTitleEn : bill.longTitleGa,
    shortTitleLabel: isEnglish
      ? 'Short Title (English)'
      : 'Gearrteideal (Gaeilge)',
    longTitleLabel: isEnglish ? 'Long Title (English)' : 'Fadteideal (Gaeilge)',
    statusLabel: isEnglish ? 'Status' : 'Stádas',
    sponsorLabel: isEnglish ? 'Sponsor' : 'Urraí'
  };

  return (
    <Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {content.shortTitleLabel}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {content.shortTitle}
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom>
        {content.longTitleLabel}
      </Typography>
      <Typography variant="body1">{content.longTitle}</Typography>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>{content.statusLabel}:</strong> {bill.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>{content.sponsorLabel}:</strong> {bill.sponsor}
        </Typography>
      </Box>
    </Box>
  );
};
