import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';
import { ChangeEvent } from 'react';

export interface IStudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
  onSortChange?: (newFilter: ListParams) => void;
}

export default function StudentFilter({
  filter,
  onSearchChange,
  cityList,
  onChange,
}: IStudentFilterProps) {
  const searchRef = React.useRef<HTMLInputElement>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    //filter is change lot of list item must reset p_page
    const newFilter = { ...filter, name_like: e.target.value, _page: 1 };

    onSearchChange(newFilter);
  };

  const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    //filter is change lot of list item must reset p_page

    const newFilter = { ...filter, city: e.target.value || undefined, _page: 1 };

    onChange(newFilter);
  };
  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const value = e.target.value;

    const [_sort, _order] = (value as string).split('.');

    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);

    // reset value input Uncontroll
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Search by name debound */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="search-by-name">Search by name</InputLabel>
            <OutlinedInput
              id="search-by-name"
              label="Search by name"
              defaultValue={filter.name_like}
              endAdornment={<Search />}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filter-by-city">Filter by City</InputLabel>

            <Select
              labelId="filter-by-city"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => {
                return (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sort-student">Sort student</InputLabel>

            <Select
              labelId="sort-student"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Sort student"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>

              <MenuItem value={'name.asc'}>Name Asc</MenuItem>
              <MenuItem value={'name.desc'}>Name Desc</MenuItem>
              <MenuItem value={'mark.asc'}>Mark Asc</MenuItem>
              <MenuItem value={'mark.desc'}>Mark Desc</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
