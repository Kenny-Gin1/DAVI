import { useMemo } from 'react';
import { useProposal } from 'hooks/Guilds/ether-swr/guild/useProposal';
import { useGuildConfig } from './ether-swr/guild/useGuildConfig';
import { getBigNumberPercentage } from 'utils/bnPercentage';

// Gets vote summary as array of percentages
export default function useVoteSummary(
  guildId: string,
  proposalId: string
): number[] {
  const { data: { totalVotes = null } = {} } = useProposal(guildId, proposalId);
  const { data: { totalLocked = null } = {} } = useGuildConfig(guildId);

  const votes = useMemo(() => {
    if (totalVotes && totalLocked) {
      const newVotes = [];
      // Set to 2 because totalActions is set to 0 for now
      // Change loop length to totalActions
      for (var i = 0; i < 2; i++) {
        if (totalVotes[i]?.gt(0)) {
          newVotes.push(getBigNumberPercentage(totalVotes[i], totalLocked, 2));
        } else {
          newVotes.push(0);
        }
      }
      return newVotes;
    } else {
      return [];
    }
  }, [totalVotes, totalLocked]);

  return votes;
}
