"""Add a column

Revision ID: 855a650fd235
Revises: 36db4c505555
Create Date: 2024-06-13 12:58:12.109194

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '855a650fd235'
down_revision: Union[str, None] = '36db4c505555'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
