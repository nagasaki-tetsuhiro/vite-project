/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onCreateRoom(filter: $filter) {
      id
      branchName
      branchId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom($filter: ModelSubscriptionRoomFilterInput) {
    onUpdateRoom(filter: $filter) {
      id
      branchName
      branchId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom($filter: ModelSubscriptionRoomFilterInput) {
    onDeleteRoom(filter: $filter) {
      id
      branchName
      branchId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onCreateMessage(filter: $filter, owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onUpdateMessage(filter: $filter, owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage(
    $filter: ModelSubscriptionMessageFilterInput
    $owner: String
  ) {
    onDeleteMessage(filter: $filter, owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
