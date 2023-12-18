import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList'; // Asegúrate de tener la ruta correcta

describe('RepositoryListContainer', () => {
  it('renders repository information correctly', () => {
    const repositories = {
      totalCount: 2,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
        startCursor: null,
      },
      edges: [
        {
          node: {
            id: 'jaredpalmer.formik',
            fullName: 'jaredpalmer/formik',
            description: 'Build forms in React, without the tears',
            language: 'TypeScript',
            forksCount: 1619,
            stargazersCount: 21856,
            ratingAverage: 88,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
          },
          cursor: 'cursor1',
        },
        {
          node: {
            id: 'async-library.react-async',
            fullName: 'async-library/react-async',
            description: 'Flexible promise-based React data loader',
            language: 'JavaScript',
            forksCount: 69,
            stargazersCount: 1760,
            ratingAverage: 72,
            reviewCount: 3,
            ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
          },
          cursor: 'cursor2',
        },
      ],
    };

    render(<RepositoryListContainer repositories={repositories} />);

    screen.debug()
    // Obtener todos los elementos por el testID 'repositoryItem'
    const repositoryItems = screen.getAllByTestId('repositoryItem');

    // Verificar que se representen los elementos correctamente
    expect(repositoryItems).toHaveLength(2);

    // Verificar el contenido del primer elemento
    const firstRepositoryItem = repositoryItems[0];
    //name
    expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
    //description
    expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears');
    // language
    expect(firstRepositoryItem).toHaveTextContent('TypeScript');
    // forks
    expect(firstRepositoryItem).toHaveTextContent('Forks1.6k'); 
    // stars
    expect(firstRepositoryItem).toHaveTextContent('Stars21.9k');
    // rating
    expect(firstRepositoryItem).toHaveTextContent('Rating88');
    // reviews
    expect(firstRepositoryItem).toHaveTextContent('Reviews3');

    // Verificar el contenido del segundo elemento
    const secondRepositoryItem = repositoryItems[1];
    expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');
    expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader');
    expect(secondRepositoryItem).toHaveTextContent('JavaScript');
    expect(secondRepositoryItem).toHaveTextContent('Forks69');
    expect(secondRepositoryItem).toHaveTextContent('Stars1.8k'); 
    expect(secondRepositoryItem).toHaveTextContent('Rating72');
    expect(secondRepositoryItem).toHaveTextContent('Reviews3');
  });
});