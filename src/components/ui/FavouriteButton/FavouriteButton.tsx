import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';

import { useAddFavourite } from '../../../hooks/api/useAddFavourite';
import { useGetFavourites } from '../../../hooks/api/useGetFavourites';
import { useRemoveFavourite } from '../../../hooks/api/useRemoveFavourite';

type FavouriteButtonProps = {
  billId: string;
  onClick?: (e: React.MouseEvent) => void;
};

export const FavouriteButton = ({ billId, onClick }: FavouriteButtonProps) => {
  const { data: favouritesData } = useGetFavourites();
  const addFavourite = useAddFavourite();
  const removeFavourite = useRemoveFavourite();

  const isFav = !!favouritesData?.favourites[billId];
  const isToggling = addFavourite.isPending || removeFavourite.isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (isFav) {
        await removeFavourite.mutateAsync(billId);
      } else {
        await addFavourite.mutateAsync(billId);
      }
      onClick?.(e);
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  return (
    <Tooltip title={isFav ? 'Remove from favourites' : 'Add to favourites'}>
      <IconButton
        onClick={handleClick}
        size="small"
        disabled={isToggling}
        sx={{
          color: isFav ? 'error.main' : 'grey.400',
          '&:hover': {
            color: isFav ? 'error.dark' : 'error.light'
          }
        }}
      >
        {isToggling ? (
          <CircularProgress size={20} color="inherit" />
        ) : isFav ? (
          <Favorite />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>
    </Tooltip>
  );
};
