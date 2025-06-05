'use client'
import { Group } from '@prisma/client';
 type GroupListProps = {
	groups: Group[];
	value?: number;
}

function GroupList({groups, value}: GroupListProps) {

	return ( 
		<select
			defaultValue={value || 0} 
			name="group" 
			className="default-input">
      <option value={0}>Группа</option>
			{groups.length > 0 && groups.map((group) => (
				<option key={group.id} value={group.id}>
					{group.name}
				</option>
			))}
    </select>
	);
}

export default GroupList;