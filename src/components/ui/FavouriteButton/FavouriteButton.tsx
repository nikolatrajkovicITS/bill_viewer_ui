import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';

import { useAddFavourite } from '@/hooks/api/useAddFavourite';
import { useGetFavourites } from '@/hooks/api/useGetFavourites';
import { useRemoveFavourite } from '@/hooks/api/useRemoveFavourite';
import type { BillModel } from '@/types/bill.type';

type FavouriteButtonProps = {
  bill: BillModel;
  onClick?: (e: React.MouseEvent) => void;
};

export const FavouriteButton = ({ bill, onClick }: FavouriteButtonProps) => {
  const { data: favouritesData } = useGetFavourites();
  const addFavourite = useAddFavourite();
  const removeFavourite = useRemoveFavourite();

  const isFav = !!favouritesData?.favourites[bill.billNo];
  const isToggling = addFavourite.isPending || removeFavourite.isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isFav) {
        await removeFavourite.mutateAsync(bill.billNo);
      } else {
        await addFavourite.mutateAsync(bill);
      }
      onClick?.(e);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <>
      {isToggling ? (
        <IconButton
          size="small"
          disabled
          sx={{
            color: 'grey.400',
            cursor: 'not-allowed'
          }}
        >
          <CircularProgress size={20} color="inherit" />
        </IconButton>
      ) : (
        <Tooltip title={isFav ? 'Remove from favourites' : 'Add to favourites'}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              color: isFav ? 'error.main' : 'grey.400',
              '&:hover': {
                color: isFav ? 'error.dark' : 'error.light'
              }
            }}
          >
            {isFav ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
