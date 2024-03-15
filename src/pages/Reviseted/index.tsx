import withAuth from '../../hooks/withAuth';
import Table from '../../components/Table';
import { useContextStore } from '../../context/StoreContext';

function RevisitedPage() {

  const {users, countries} = useContextStore();

  return (
    <div>
      <Table users={users} countries={countries}/>
    </div>
  );
}

export default withAuth(RevisitedPage);
