interface Props {
    selectedCategory: 'Mobil telefonlar' | 'Audio' | 'Foto və videokameralar' | 'Kompüter, noutbuk və planşetlər' | 'Noutbuk və netbuklar' | 'SSD diskləri'
    | 'Dinamiklər və kolonkalar' | 'Səs gücləndiriciləri' | 'Musiqi mərkəzləri' | 'Maqnitofonlar' | 'Diktofonlar' | 'Mikrofonlar'
    ;
}

export default function Template({ selectedCategory }: Props) {
    switch (selectedCategory) {
        case 'Mobil telefonlar':
            return (
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                    {/* Model */}
                    <div>
                        <label className="block font-semibold">Model</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Vəziyyəti */}
                    <div>
                        <label className="block font-semibold">Vəziyyəti</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Yaddaş tutumu */}
                    <div>
                        <label className="block font-semibold">Yaddaş tutumu</label>
                        <input type="text" className="w-full border rounded p-2" placeholder="məs: 128 GB" />
                    </div>

                    {/* Operativ yaddaş */}
                    <div>
                        <label className="block font-semibold">Operativ yaddaş, RAM (GB)</label>
                        <input type="text" className="w-full border rounded p-2" placeholder="məs: 6 GB" />
                    </div>

                    {/* Rəng */}
                    <div>
                        <label className="block font-semibold">Rəng</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Çatdırılma */}
                    <div>
                        <label className="block font-semibold">Çatdırılma</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>

                    {/* Əlavə olaraq */}
                    <div className="col-span-2">
                        <label className="block font-semibold">Əlavə olaraq</label>
                        <input type="text" className="w-full border rounded p-2" />
                    </div>
                </div>
            );
        case "Audio":
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Qoşulma növü* */}
                <div>
                    <label className="block font-semibold">Qoşulma növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Vəziyyəti */}
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Rəng */}
                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Çatdırılma */}
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Konstruksiyasının növü */}
                <div>
                    <label className="block font-semibold">Konstruksiyasının növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case "Foto və videokameralar":
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                {/* Vəziyyəti */}
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case "Kompüter, noutbuk və planşetlər":
        case 'Noutbuk və netbuklar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Nüvələrinin sayı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Operativ yaddaşı (GB)</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Prosessoru</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Təyinatı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Displeyi (düym)</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Yığıcı növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kompüterin növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">ƏS</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Videokartı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Yaddaş növü</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
        case 'SSD diskləri':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Yaddaş</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Standart</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Növ</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Zəmanət</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kredit</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Dinamiklər və kolonkalar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kolonka növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Rəng</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Kanalların sayı</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Səs gücləndiriciləri':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case "Musiqi mərkəzləri":
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                {/* Brend */}
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Maqnitofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Maqnitofon növü *</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Diktofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
            </div>
        case 'Mikrofonlar':
            return <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div>
                    <label className="block font-semibold">Brend</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Qoşulma növü*</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

                <div>
                    <label className="block font-semibold">Çatdırılma</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label className="block font-semibold">Vəziyyəti</label>
                    <input type="text" className="w-full border rounded p-2" />
                </div>

            </div>
    }
}
